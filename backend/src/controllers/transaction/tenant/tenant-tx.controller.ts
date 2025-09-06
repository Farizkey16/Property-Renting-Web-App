import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import AppError from "../../../errors/AppError";
import {
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

      const transactionId = req.params?.id;

      if (!transactionId) {
        throw new AppError("Invalid transaction ID", 400);
      }

      // Batch Query Accept Transaction
      const bookingProcess = await prisma.$transaction(async (tx) => {
        // Validate Property --> repository selects property key
        await ValidateBooking(transactionId, role.userId, tx);

        // Update booking and Return UserID
        const userID = await UpdateBookings(transactionId, "confirmed", tx);

        // Validate user

        await getEmailAndFullnameById(userID);

        // Find rooms
        const findRooms = await findBookingRoomsByBookingId(transactionId, tx);

        // Finding overlapping booking from date, room_id, and booking status
        const overlappingBooking = await OverlappingBooking(transactionId, tx);

        // Calculating room availability based on dates and room
        const availability = availableRooms(findRooms, overlappingBooking, tx);

        return {
          userID,
          findRooms,
          availability,
        };
      });

      // Send Booking Confirmation
      await sendUserBookingConfirmation(
        transactionId,
        bookingProcess.userID,
        bookingProcess.findRooms
      );

      // Scheduling Reminder
      await scheduleReminder(transactionId);

      res.json({
        message: "Payment successful, booking created",
        availability: bookingProcess.availability,
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

      const transactionId = req.params.id;

      if (!transactionId) {
        throw new AppError("Invalid transaction ID", 400);
      }

      // Find Payment Proof
      await FindProofImage(transactionId);

      // Update Status to Canceled
      const cancelledBooking = await UpdateBookings(transactionId, "canceled_by_tenant");

      // Send Response
      res.json({
        message: "Payment canceled by Tenant, booking updated",
        data: cancelledBooking,
      });
    } catch (error) {
      next(error);
    }
  };

  public getReservation = async (
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

      // if (tenant.role === "tenant") {
      //   // if (!tenant.id) {
      //   //   throw new AppError(
      //   //     "Tenant ID not found in token for tenant user.",
      //   //     403
      //   //   );
      //   // }
      //   whereClause.property = {
      //     tenant_id: tenant.id,
      //   };
      // } else {
      //   whereClause.user_id = tenant.user_id;
      // }

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
}

export default TenantTransactions;
