import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
<<<<<<< HEAD
import { DateTime } from "luxon";
import AppError from "../../../errors/AppError";
import { getUserById } from "../../../services/user/user.service";
import { UpdateRoomAvailability } from "../../../repositories/transaction/tenant-tx.repository";
import { Prisma } from "../../../../prisma/generated/client";
import { BookingStatus } from "../../../../prisma/generated/client";
=======
import { handleUpload } from "../../../config/cloudinary";
import { DateTime } from "luxon"
import AppError from "../../../errors/AppError";
import { getUserById } from "../../../services/user/user.service";
import { UpdateRoomAvailability } from "../../../repositories/transaction/transaction.repository";
>>>>>>> main

class UserTransactions {
  public reservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
<<<<<<< HEAD
      const role = res.locals.decrypt;

      const userId = role.userId;
      console.log("userId from token:", userId);
      const user = await getUserById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
=======
      // Validate role
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId
      console.log("userId from token:", userId)

      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404)
>>>>>>> main
      }

      // Validating fields
      const {
        property_id,
        check_in_date,
        check_out_date,
        room_id,
        guests_count,
        nights,
        total_price,
        price_per_night,
        subtotal,
<<<<<<< HEAD
        quantity,
      } = req.body;

      if (!property_id || !check_in_date || !check_out_date) {
        throw new AppError("Please enter the required fields", 400);
=======
        quantity
      } = req.body;

      if (!property_id || !check_in_date || !check_out_date) {
        throw new AppError("Please enter the required fields", 400)
>>>>>>> main
      }

      // Checking Room Availability
      const conflict_dates = await prisma.room_availability.findMany({
        where: {
          room_id,
          date: {
            gte: new Date(check_in_date),
            lt: new Date(check_out_date),
          },
          is_available: false,
        },
      });

      if (conflict_dates.length > 0) {
<<<<<<< HEAD
        throw new AppError("Room is not available", 409);
=======
        throw new AppError("Room is not available", 409)
>>>>>>> main
      }

      await prisma.$transaction(async (tx) => {
        // Create Booking Property
        const newBookings = await tx.bookings.create({
          data: {
            status: "waiting_payment",
            check_in_date: new Date(check_in_date),
            check_out_date: new Date(check_out_date),
            total_price: total_price,
            amount: total_price,
            user: {
              connect: { id: user.id },
            },
            property: {
              connect: { id: property_id },
            },
          },
        });

        // Create Booking Room
        await tx.booking_rooms.create({
          data: {
            booking_id: newBookings.id,
            room_id: room_id,
            guests_count: guests_count,
            price_per_night: price_per_night,
<<<<<<< HEAD
            check_in_date: new Date(check_in_date),
            check_out_date: new Date(check_out_date),
=======
            check_in_date: check_in_date,
            check_out_date: check_out_date,
>>>>>>> main
            quantity: quantity,
            nights: nights,
            subtotal: subtotal,
          },
        });

        // Update availability
        await tx.room_availability.updateMany({
          where: {
            room_id: room_id,
            date: {
              gte: new Date(check_in_date),
              lt: new Date(check_out_date),
            },
          },
          data: {
            is_available: false,
          },
        });

        // 1 Hour Timer
        const bookingDate = newBookings.created_at;
        const expired = DateTime.fromJSDate(bookingDate).plus({ hours: 1 });
      });

      // Send Response
      res.status(201).json({
        success: true,
        message: "Booking successfully created.",
      });
    } catch (error) {
<<<<<<< HEAD
      console.log(error);
=======
>>>>>>> main
      next(error);
    }
  };

  public getReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
<<<<<<< HEAD
      const { status, check_in_date, check_out_date, sort } = req.query;
      const { bookingId } = req.params
      const userId = res.locals.decrypt.userId;
      console.log("userId from token:", userId);

      // Default Filter
      const whereClause: Prisma.bookingsWhereInput = {
        user_id: userId,
      };

      // Status Filter
      if (status && typeof status === "string") {
        whereClause.status = status as BookingStatus;
=======
      // Validate Role
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId
      console.log("userId from token:", userId)
      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404);
>>>>>>> main
      }

      // Date Filter
      if (
        check_in_date &&
        typeof check_in_date === "string" &&
        check_out_date &&
        typeof check_out_date === "string"
      ) {
        const start = new Date(check_in_date);
        const end = new Date(check_out_date);

        // Check Date Validity
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          whereClause.check_in_date = { gte: start };
          whereClause.check_out_date = { lt: end };
        }
      }

        // Booking ID Filter
        if (bookingId && typeof bookingId === "string") {
          whereClause.id = bookingId;
        }

      const bookings = await prisma.bookings.findMany({
        where: whereClause,
        orderBy: {
          created_at: sort === 'asc' ? 'asc' : 'desc'
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
<<<<<<< HEAD
          property: {
=======
        },
      });

      if (!bookings || bookings.length === 0) {
        throw new AppError("No reservations found", 404)
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

  public getReservationsByDate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { check_in_date, check_out_date } = req.body;

      // Validate Role
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId)
      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const bookings = await prisma.bookings.findMany({
        where: {
          user_id: user.id,
          check_in_date: { gte: new Date(check_in_date) },
          check_out_date: { lte: new Date(check_out_date) },
        },
        select: {
          id: true,
          check_in_date: true,
          check_out_date: true,
          booking_rooms: {
>>>>>>> main
            select: {
              name: true,
              main_image: true,
              city: true
            }
          },
          status: true

        },
      });

      if (!bookings || bookings.length === 0) {
<<<<<<< HEAD
        throw new AppError("No reservations found", 404);
=======
        throw new AppError("No reservations found", 404)
>>>>>>> main
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

<<<<<<< HEAD
=======
  public getReservationsByOrderNo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { booking_id } = req.params;

      // Validate Role
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId
      console.log("userId from token:", userId)

      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404)
      }

      const bookings = await prisma.bookings.findMany({
        where: {
          user_id: user.id,
          id: booking_id,
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
      });

      if (!bookings || bookings.length === 0) {
        throw new AppError("No reservations found", 404)
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
>>>>>>> main

  public getReservationsHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate Role
<<<<<<< HEAD
      const decrypt = res.locals.decrypt;

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId);
      const user = await getUserById(userId);
=======
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId
      console.log("userId from token:", userId)
      const user = await getUserById(userId)
>>>>>>> main

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
<<<<<<< HEAD
        throw new AppError("No reservations found", 404);
=======
        throw new AppError("No reservations found", 404)
>>>>>>> main
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

<<<<<<< HEAD
=======
  public getReservationsByStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate Role
       const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId)
      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const bookings = await prisma.bookings.findMany({
        where: {
          user_id: user.id,
          check_out_date: {
            lt: new Date(),
          },
          status: {
            in: ["confirmed", "canceled"]
          }
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
            check_out_date: "desc"
        }
      });

      if (!bookings || bookings.length === 0) {
        throw new AppError("No reservations found", 404)
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
>>>>>>> main

  public paymentProofUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate Role
<<<<<<< HEAD
      const decrypt = res.locals.decrypt;

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId);

      const user = await getUserById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
=======
      const decrypt = res.locals.decrypt

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401)
      }

      const userId = decrypt.userId
      console.log("userId from token:", userId)

      const user = await getUserById(userId)

      if (!user) {
        throw new AppError("User not found", 404)
>>>>>>> main
      }

      // Upload
      if (!req.file) {
<<<<<<< HEAD
        throw new AppError("No file uploaded.", 400);
=======
        throw new AppError("No file uploaded.", 400)
>>>>>>> main
      }
      // const b64 = Buffer.from(req.file.buffer).toString("base64");
      // let dataURI = "data:" + req.file.mimetype + ";base64," + b64; // Must be converted to base64 data URI since Cloudinary cannot handle raw Node.js buffer
      // const cldRes = await handleUpload(dataURI); // This syntax is much more simpler than using Streamifier, but the downside is base64 consumes 33% more memory.
      // const final_img = cldRes?.secure_url;

      const { booking_id } = req.params;

      await prisma.bookings.update({
        where: {
          id: booking_id,
        },
        data: {
          // proof_image: final_img,
        },
      });

      res.status(200).json({
        success: true,
        message: "Upload payment proof successful.",
        // data: cldRes,
      });
    } catch (err) {
      next(err);
    }
  };
}

<<<<<<< HEAD
export default UserTransactions;
=======

export default UserTransactions
>>>>>>> main
