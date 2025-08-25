import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { BookingStatus } from "../../../prisma/generated/client";
import { BookingRoomCompleteType } from "../../types/transaction/transactions.types";

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
  transaction_id: string,
  status: BookingStatus,
  tx?: Prisma.TransactionClient
) => {
  const updateBooking = await tx.bookings.update({
    where: {
      id: transaction_id,
    },
    data: {
      status: status,
    },
    select: {
      user_id: true,
    },
  });

  if (!updateBooking) {
    throw new AppError("Booking cannot be updated", 400);
  }

  return updateBooking.user_id;
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

export const OverlappingBooking = async (
  bookingId: string,
  tx: Prisma.TransactionClient
) => {
  const findBookings = await findBookingRoomsByBookingId(bookingId, tx);

  const roomIds: string[] = (findBookings as BookingRoomCompleteType[]).map(
    (rid) => rid.room_id
  );
  const bookingRoomIds: string[] = (
    findBookings as BookingRoomCompleteType[]
  ).map((brid) => brid.id);
  const checkOut: Date[] = (findBookings as BookingRoomCompleteType[]).map(
    (co) => co.check_out_date
  );
  const checkIn: Date[] = (findBookings as BookingRoomCompleteType[]).map(
    (ci) => ci.check_in_date
  );

  const earliestCheckIn = new Date(
    Math.min(...checkIn.map((date) => date.getTime()))
  );
  const latestCheckOut = new Date(
    Math.max(...checkOut.map((date) => date.getTime()))
  );

  if (roomIds.length === 0) {
    return [];
  }

  const ovrBooking = await tx.booking_rooms.findMany({
    where: {
      room_id: {
        in: roomIds,
      },
      id: {
        not: {
          in: bookingRoomIds,
        },
      },
      OR: [
        { booking: { status: "confirmed" } },
        { booking: { status: "waiting_payment" } },
      ],
      check_in_date: { lt: latestCheckOut },
      check_out_date: { gt: earliestCheckIn },
    },
    select: {
      room_id: true,
      quantity: true,
      room: {
        select: {
          total_rooms: true,
        },
      },
    },
  });

  return ovrBooking;
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
    throw new AppError("The booking does not exist.", 404);
  } else {
    if (result.proof_image) {
      console.log("Proof image exists:", result.proof_image);
    } else {
      console.log(
        "Booking exists, but a proof image has not been uploaded yet. Cancellation cannot be processed."
      );
      return;
    }
  }

  return result;
};
