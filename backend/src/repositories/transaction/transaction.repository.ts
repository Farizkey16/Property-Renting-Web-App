import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { BookingStatus } from "../../../prisma/generated/client";

export const ValidateBooking = async (
  booking_id: string,
  tenant_id: string,
  tx: Prisma.TransactionClient
) => {
  const checkBooking = await tx.bookings.findFirst({
    where: {
      id: booking_id,
      property: {
        tenant_id: tenant_id,
      },
    },
    select: {
      property: true,
      user_id: true,
    },
  });

  if (!checkBooking) {
    throw new AppError("You can only access your own property.", 401);
  }
};

export const UpdateBookings = async (
  booking_id: string,
  status: BookingStatus,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const updateBooking = await db.bookings.update({
    where: {
      id: booking_id,
    },
    data: {
      status: status,
    },
  });

  if (!updateBooking) {
    throw new AppError("Booking cannot be updated", 400);
  }

  return updateBooking;
};

export const findBookingRoomsByBookingId = async (
  bookingId: string,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const bookingRooms = await db.booking_rooms.findMany({
    where: {
      booking_id: bookingId,
    },
    select: {
      booking_id: true,
      room_id: true,
      quantity: true,
      id: true,
      check_in_date: true,
      check_out_date: true,
      guests_count: true,
      nights: true,
      subtotal: true,
      room: {
        select: {
          total_rooms: true,
          name: true,
          property: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return bookingRooms;
};

export const checkRoomInventory = async (
  tx: Prisma.TransactionClient,
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date,
  requestQuantity: number
) => {
  const db = tx ?? prisma;
  const room = tx.rooms.findUnique({
    where: {
      id: roomId,
    },
    select: {
      total_rooms: true,
    },
  });

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  const totalInventory = room.total_rooms;

  const overlapBookings = await tx.booking_rooms.findMany({
    where: {
      room_id: roomId,
      booking: {
        status: {
          in: ["confirmed", "waiting_confirmation", "waiting_payment"],
        },
      },
      check_in_date: {
        lt: new Date(checkOutDate),
      },
      check_out_date: {
        gt: new Date(checkInDate),
      },
    },
    select: {
      quantity: true,
    },
  });

  const bookedQuantity = overlapBookings.reduce(
    (sum: number, booking: { quantity: number }) => sum + booking.quantity,
    0
  );

  const availableInventory = totalInventory - bookedQuantity;
  if (requestQuantity > availableInventory) {
    throw new AppError(
      `Room is not available. Only ${availableInventory} rooms left.`,
      400
    );
  }
};

export const UpdateRoomAvailability = async (
  roomId: string,
  data: string[],
  availability: Boolean,
  tx?: Prisma.TransactionClient
) => {
  const earliestCheckIn = new Date(
    Math.min(...data.map((date: any) => new Date(date).getTime()))
  );
  const latestCheckOut = new Date(
    Math.max(...data.map((date: any) => new Date(date).getTime()))
  );

  const db = tx ?? prisma;
  const roomAvail = await db.room_availability.updateMany({
    where: {
      room_id: roomId,
      date: {
        gte: earliestCheckIn,
        lt: latestCheckOut,
      },
    },
    data: {
      is_available: availability,
    },
  });

  return roomAvail;
};

export const FindProofImage = async (
  bookingId: string,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const result = await db.bookings.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      proof_image: true,
    },
  });

  if (!result) {
    throw new AppError("This booking does not exist.", 404);
  }
  return result;
};
