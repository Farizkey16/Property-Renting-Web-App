import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { DateTime } from "luxon";
import AppError from "../../../errors/AppError";
import { getUserById } from "../../../services/user/user.service";
import {
  findBookingByIdRepository,
  UpdateRoomAvailability,
} from "../../../repositories/transaction/tenant-tx.repository";
import { Prisma } from "../../../../prisma/generated/client";
import { eachDayOfInterval } from "date-fns";
import { BookingStatus } from "../../../../prisma/generated/client";
import { isValidBookingStatus } from "../../../types/transaction/transactions.types";
import {
  FindProofImage,
  UpdateBookings,
} from "../../../repositories/transaction/transaction.repository";
import { proofUploadService } from "../../../services/transaction/transaction.service";

type Booking = Prisma.bookingsGetPayload<{}>;

class UserTransactions {
  public reservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = res.locals.decrypt;

      const userId = role.userId;
      console.log("userId from token:", userId);
      const user = await getUserById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Validating fields
      const {
        propertyId,
        checkInDate,
        checkOutDate,
        roomId,
        guests,
        nights,
        totalPrice,
        subtotal,
        quantity,
      } = req.body;

      if (!propertyId || !checkInDate || !checkOutDate || !guests) {
        throw new AppError("Please enter the required fields", 400);
      }

      // Checking Room Availability
      const conflict_dates = await prisma.room_availability.findMany({
        where: {
          room_id: roomId,
          date: {
            gte: new Date(checkInDate),
            lt: new Date(checkOutDate),
          },
          is_available: false,
        },
      });

      if (conflict_dates.length > 0) {
        throw new AppError("Room is not available", 409);
      }

      const createBooking: Booking = await prisma.$transaction(async (tx) => {
        // Create Booking Property
        const newBookings = await tx.bookings.create({
          data: {
            status: "waiting_confirmation",
            check_in_date: new Date(checkInDate),
            check_out_date: new Date(checkOutDate),
            total_price: totalPrice,
            amount: totalPrice,
            user: {
              connect: { id: user.id },
            },
            property: {
              connect: { id: propertyId },
            },
            booking_rooms: {
              create: {
                room_id: roomId,
                guests_count: guests,
                price_per_night: subtotal,
                check_in_date: new Date(checkInDate),
                check_out_date: new Date(checkOutDate),
                quantity: Number(quantity),
                nights: nights,
                subtotal: subtotal,
              },
            },
          },
        });

        const datesToUpdate = eachDayOfInterval({
          start: new Date(checkInDate),
          end: new Date(checkOutDate),
        });
        datesToUpdate.pop();

        await Promise.all(
          datesToUpdate.map((date) =>
            tx.room_availability.upsert({
              where: {
                room_id_date: {
                  room_id: roomId,
                  date: date,
                },
              },
              update: {
                is_available: false,
              },
              create: {
                room_id: roomId,
                date: date,
                is_available: false,
              },
            })
          )
        );

        return newBookings;
      });

      // Send Response
      res.status(201).json({
        success: true,
        message: "Booking successfully created.",
        data: createBooking,
      });
    } catch (error) {
      console.log(error);
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
      } = req.query;
      const { bookingId } = req.params;
      const userId = res.locals.decrypt.userId;
      console.log("userId from token:", userId);

      // Default Filter
      const whereClause: Prisma.bookingsWhereInput = {
        user_id: userId,
      };

      // Booking ID Filter
      if (bookingId && typeof bookingId === "string") {
        whereClause.id = bookingId;
      }

      // Status Filter
      if (status) {
        const statusList = [].concat(status as any);
        const validStatus = statusList.filter((s) => isValidBookingStatus(s));
        if (validStatus.length > 0) {
          whereClause.status = { in: validStatus };
        }
      }

      // Date Filter
      if (
        startDate &&
        typeof startDate === "string" &&
        endDate &&
        typeof endDate === "string"
      ) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check Date Validity
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          whereClause.check_in_date = { gte: start };
          whereClause.check_out_date = { lt: end };
        }
      }

      const bookings = await prisma.bookings.findMany({
        where: whereClause,
        orderBy: {
          created_at: sort === "asc" ? "asc" : "desc",
        },
        select: {
          id: true,
          check_in_date: true,
          check_out_date: true,
          payment_deadline: true,
          booking_rooms: {
            select: {
              id: true,
              room_id: true,
              guests_count: true,
              nights: true,
              price_per_night: true,
              subtotal: true,
            },
          },
          property: {
            select: {
              name: true,
              main_image: true,
              city: true,
            },
          },
          status: true,
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "Reservations successfully fetched.",
        data: bookings,
      });
    } catch (err) {
      next(err);
    }
  };

  public getReservationsHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate Role
      const decrypt = res.locals.decrypt;

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId);
      const user = await getUserById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const bookings = await prisma.bookings.findMany({
        where: {
          user_id: user.id,
          check_out_date: {
            lt: new Date(),
          },
        },
        select: {
          id: true,
          check_in_date: true,
          check_out_date: true,
          booking_rooms: {
            select: {
              id: true,
              room_id: true,
              guests_count: true,
              nights: true,
              price_per_night: true,
              subtotal: true,
            },
          },
        },
        orderBy: {
          check_out_date: "desc",
        },
      });

      if (!bookings || bookings.length === 0) {
        throw new AppError("No reservations found", 404);
      }

      res.status(200).json({
        success: true,
        message: "Reservations successfully fetched.",
        data: bookings,
      });
    } catch (err) {
      next(err);
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
        throw new AppError(
          "Booking not found or you are not authorized to view it.",
          404
        );
      }

      res.status(200).json({
        message: "Booking retrieved successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  };

  public paymentProofUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate Role
      const decrypt = res.locals.decrypt;

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId);

      // Upload
      if (!req.file) {
        throw new AppError("No file uploaded.", 400);
      }

      const { booking_id } = req.params;

      const response = await proofUploadService(userId, booking_id, req.file);

      res.status(200).json({
        success: true,
        message: "Upload payment proof successful.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  };

  public cancelPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: bookingId } = req.params;

      if (!bookingId) {
        throw new AppError("Invalid transaction ID", 400);
      }

      console.log("booking Id is: ", bookingId);

      const proof = await FindProofImage(bookingId);

      if (proof.proof_image) {
        console.log(
          "Proof image exists, cannot cancel booking:",
          proof.proof_image
        );
        return;
      } else {
        console.log(
          "Booking exists, but a proof image has not been uploaded yet."
        );

        console.log("proof image is:", proof);

        // Update Status to Canceled
        const cancelledBooking = await UpdateBookings(bookingId, "canceled");

        res.json({
          message: "Payment canceled by Tenant, booking updated",
          data: cancelledBooking,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserTransactions;
