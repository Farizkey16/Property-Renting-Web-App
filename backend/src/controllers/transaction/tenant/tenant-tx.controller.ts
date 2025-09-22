import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import AppError from "../../../errors/AppError";
import {
  acceptBookingPayment,
  findBookingByIdRepository,
  findBookingIncludeBookingRooms,
  findBookingRoomsByBookingId,
  FindProofImage,
  getOrderRepository,
  OverlappingBooking,
  UpdateBookings,
  UpdateRoomAvailability,
  ValidateBooking,
} from "../../../repositories/transaction/tenant-tx.repository";
import { getEmailAndFullnameById } from "../../../repositories/user/user.respository";
import {
  availableRooms,
  scheduleReminder,
  sendRejectionNotification,
  sendUserBookingConfirmation,
} from "../../../services/transaction/transaction.service";
import { Prisma } from "../../../../prisma/generated/client";
import { isValidBookingStatus } from "../../../types/transaction/transactions.types";
import { getFilteredBookings } from "../../../repositories/transaction/user-tx.repository";
import { getDatesBetween } from "../../../utils/getDatesBetween";

class TenantTransactions {
  public acceptPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = res.locals.decrypt.role;

      const bookingId = req.params.id;

      const updatedBooking = await acceptBookingPayment(
        bookingId,
        role.tenant_id
      );

      // Send Booking Confirmation
      await sendUserBookingConfirmation(updatedBooking);

      // Scheduling Reminder
      await scheduleReminder(bookingId);

      res.json({
        message: "Payment successful, booking created",
        data: updatedBooking,
      });
    } catch (error) {
      next(error);
    }
  };

  public rejectPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = res.locals.decrypt.role;

      const bookingId = req.params.id;

      console.log("Fetching from bookingId:", bookingId)

      if (!bookingId) {
        throw new AppError("Invalid transaction ID", 400);
      }

      const rejectProcess = await prisma.$transaction(async (tx) => {
        // Validate Property --> repository selects property key
        await ValidateBooking(bookingId, role.userId, tx);

        // Update booking and Return UserID

        const userId = await UpdateBookings(bookingId, "waiting_payment", tx);

        const booking = await findBookingIncludeBookingRooms(bookingId, tx)

        const datesToUpdate = getDatesBetween(booking.check_in_date, booking.check_out_date)
        
        const roomId = booking.booking_rooms.room_id


        // Validate user
        const user = await getEmailAndFullnameById(userId);

        // Update Availability
        await UpdateRoomAvailability(
          roomId,
          datesToUpdate,
          true,
          tx
        );

        return { userId, user };
      });

      // Send Rejection Notification
      await sendRejectionNotification(bookingId, rejectProcess.userId);

      res.json({
        message: "Payment rejected, booking updated",
        userID: rejectProcess.userId,
      });
    } catch (error) {
      next(error);
    }
  };

  public cancelPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookingId = req.params.id;

      if (!bookingId) {
        throw new AppError("Invalid booking ID", 400);
      }

      // // Find Payment Proof
      // const result = await FindProofImage(bookingId);

      // if (!result) {
      //   throw new AppError("The booking does not exist.", 404);
      // } else {
      //   if (result.proof_image) {
      //     console.log(
      //       "Proof image exists, booking cannot be cancelled.",
      //       result.proof_image
      //     );
      //     return;
      //   } else {
      //     console.log(
      //       "Booking exists, but a proof image has not been uploaded yet. Cancelling booking..."
      //     );
      //   }
      // }

      // console.log("proof:", result);

      // Update Status to Canceled
      const cancelledBooking = await UpdateBookings(
        bookingId,
        "canceled_by_tenant"
      );

      if (!cancelledBooking) {
        throw new AppError("Booking cannot be updated", 400);
      }

      // Send Response
      res.json({
        message: "Payment canceled by Tenant, booking updated",
        data: cancelledBooking,
      });
    } catch (error) {
      next(error);
    }
  };

  public getReservationByFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Fetch Orders Based on Booking Status
      const { status, sort, end, start, bookingId } = req.query;

      if (!status || typeof status !== "string") {
        throw new AppError("Booking status query parameter is required.", 400);
      }

      const tenant = res.locals.decrypt;

      const whereClause: Prisma.bookingsWhereInput = {};

      if (tenant.role === "tenant") {
        whereClause.property = {
          tenant_id: tenant.id,
        };
      } else {
        whereClause.user_id = tenant.user_id;
      }

      if (status && typeof status === "string") {
        const validStatuses = status
          .split(",")
          .filter((s) => isValidBookingStatus(s));
        if (validStatuses.length > 0) {
          whereClause.status = { in: validStatuses };
        }
      }

      if (end && typeof end === "string") {
        whereClause.check_out_date = { lte: new Date(end) };
      }

      const orderFetch = await getOrderRepository(
        whereClause,
        sort as string | undefined
      );

      if (!orderFetch || orderFetch.length === 0) {
        res.json({
          message: "No orders found.",
          data: [],
        });
        return;
      }

      res.json({
        message: "Order(s) successfully retrieved.",
        data: orderFetch,
      });
    } catch (error) {
      next(error);
    }
  };

  public getReservationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingId } = req.params;
      const user = res.locals.decrypt;

      const booking = await findBookingByIdRepository(bookingId, user);

      if (!booking) {
        throw new AppError("Booking not found.", 404);
      }

      res.status(200).json({
        message: "Booking retrieved successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  };

  public getReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        status,
        check_in_date: startDate,
        check_out_date: endDate,
        sort,
        bookingId,
      } = req.query;

      const userId = res.locals.decrypt.userId;

      let page = 1;
      let limit = 5;

      const tenantRecord = await prisma.tenants.findUnique({
        where: { user_id: userId },
      });

      if (!tenantRecord) {
        throw new AppError("Tenant profile not found for this user.", 404);
      }
      const tenantId = tenantRecord.id;

      if (req.query.page && typeof req.query.page === "string") {
        const parsedPage = parseInt(req.query.page, 10);
        if (!isNaN(parsedPage) && parsedPage > 0) {
          page = parsedPage;
        }
      }

      if (req.query.limit && typeof req.query.limit === "string") {
        const parsedLimit = parseInt(req.query.limit, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          limit = parsedLimit;
        }
      }

      const whereClause: Prisma.bookingsWhereInput = {
        property: {
          tenant_id: tenantId,
        },
      };

      if (status && typeof status === "string") {
        const validStatuses = status
          .split(",")
          .filter((s) => isValidBookingStatus(s));
        if (validStatuses.length > 0) {
          whereClause.status = { in: validStatuses };
        }
      }

      if (endDate && typeof endDate === "string") {
        whereClause.check_out_date = { lte: new Date(endDate) };
      }

      const bookings = await getFilteredBookings(
        whereClause,
        sort,
        page,
        limit
      );
      if (bookings.data.length === 0) {
        return res.status(200).json({
          message: "No orders found for this tenant matching the criteria.",
          data: [],
        });
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Reservations successfully fetched.",
          data: bookings,
        });
    } catch (error) {
      next(error);
    }
  };

  public getAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals.decrypt;
      if (user.role !== "tenant") {
        throw new AppError(
          "Forbidden: You do not have permission to access this resource.",
          403
        );
      }

      const tenantRecord = await prisma.tenants.findUnique({
        where: {
          user_id: user.userId,
        },
      });

      const tenantId = tenantRecord?.id;

      const { startDate, endDate } = req.query;

      if (
        !startDate ||
        !endDate ||
        typeof startDate !== "string" ||
        typeof endDate !== "string"
      ) {
        throw new AppError(
          "Start and end date query parameters are required.",
          400
        );
      }

      const bookings = await prisma.bookings.findMany({
        where: {
          property: {
            tenant_id: tenantId,
          },
          status: {
            in: ["confirmed", "waiting_confirmation"],
          },
          check_in_date: {
            lte: new Date(endDate),
          },
          check_out_date: {
            gte: new Date(startDate),
          },
        },
        include: {
          booking_rooms: {
            select: {
              room: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const events = bookings.flatMap((booking) => {
        return booking.booking_rooms.map((br) => {
          return {
            id: booking.id,
            title: `${br.room.name} - Booked`,
            start: booking.check_in_date,
            end: booking.check_out_date,
            backgroundColor:
              booking.status === "confirmed" ? "#CA3433" : "#16A34A",
            borderColor: booking.status === "confirmed" ? "#CA3433" : "#16A34A",
          };
        });
      });

      res.status(200).json({
        success: true,
        message: "Availability successfully fetched.",
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TenantTransactions;
