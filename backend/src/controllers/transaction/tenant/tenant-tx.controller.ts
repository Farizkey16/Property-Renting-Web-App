import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import AppError from "../../../errors/AppError";
import {
  acceptBookingPayment,
  findBookingByIdRepository,
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

class TenantTransactions {
  public acceptPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = res.locals.decrypt.role;
      // Validate Transaction ID

      const bookingId = req.params.id;

      const updatedBooking = await acceptBookingPayment(bookingId, role.tenant_id)

      console.log("--- Full Booking Data for Email/Reminder ---", updatedBooking);


      // Send Booking Confirmation
      await sendUserBookingConfirmation(
       updatedBooking
      );

      // Scheduling Reminder
      await scheduleReminder(bookingId);

      res.json({
        message: "Payment successful, booking created",
        data: updatedBooking
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

      // Validate Transaction ID

      const transactionId = req.params.id;

      if (!transactionId) {
        throw new AppError("Invalid transaction ID", 400);
      }

      const rejectProcess = await prisma.$transaction(async (tx) => {
        // Validate Property --> repository selects property key
        await ValidateBooking(transactionId, role.userId, tx);

        // Update booking and Return UserID

        const userID = await UpdateBookings(
          transactionId,
          "waiting_payment",
          tx
        );

        // Validate user
        const user = await getEmailAndFullnameById(userID);

        // Update Availability
        await UpdateRoomAvailability(
          userID.booking_rooms.room_id,
          userID,
          true,
          tx
        );

        return { userID, user };
      });

      // Send Rejection Notification
      await sendRejectionNotification(transactionId, rejectProcess.userID);

      res.json({
        message: "Payment rejected, booking updated",
        userID: rejectProcess.userID,
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

      // Find Payment Proof
      const result = await FindProofImage(bookingId);

      if (!result) {
        throw new AppError("The booking does not exist.", 404);
      } else {
        if (result.proof_image) {
          console.log(
            "Proof image exists, booking cannot be cancelled.",
            result.proof_image
          );
          return;
        } else {
          console.log(
            "Booking exists, but a proof image has not been uploaded yet. Cancelling booking..."
          );
        }
      }

      console.log("proof:", result);

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
        if (!tenant.id) {
          throw new AppError(
            "Tenant ID not found in token for tenant user.",
            403
          );
        }
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

  public getTenantReservations = async (
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

      if (!user.userId) {
        throw new AppError(
          "Tenant ID not found in token for tenant user.",
          403
        );
      }

      const tenantRecord = await prisma.tenants.findUnique({
        where: { user_id: user.userId },
      });

      if (!tenantRecord) {
        throw new AppError("Tenant profile not found for this user.", 404);
      }
      const tenantId = tenantRecord.id;

      const { status, sort, end, start, bookingId } = req.query;

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

      if (end && typeof end === "string") {
        whereClause.check_out_date = { lte: new Date(end) };
      }

      const bookings = await getOrderRepository(
        whereClause,
        sort as string | undefined
      );
      if (bookings.length === 0) {
        return res.status(200).json({
          message: "No orders found for this tenant matching the criteria.",
          data: [],
        });
      }
      res.status(200).json({ data: bookings });
    } catch (error) {
      next(error);
    }
  };
}

export default TenantTransactions;
