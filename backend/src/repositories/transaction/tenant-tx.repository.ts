import { Prisma } from "@prisma/client";
import { Prisma as PrismaNew } from "../../../prisma/generated/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { BookingStatus } from "../../../prisma/generated/client";
import {
  BookingRoomCompleteType,
  BookingsWhereInput,
  isValidSort,
  ProofImage,
} from "../../types/transaction/transactions.types";
import { quickAddJob } from "graphile-worker";
import { BookingWithDetails } from "../../services/jobs/send-confirmation";

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
  bookingId: string,
  status: BookingStatus,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const updateBooking = await db.bookings.update({
    where: {
      id: bookingId,
    },
    data: {
      status: status,
    },
    include: {
      booking_rooms: true
    }
  });

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
      created_at: true,
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

export const UpdateRoomAvailability = async (
  roomId: string,
  date: string[],
  availability: Boolean,
  tx?: Prisma.TransactionClient
) => {
  const earliestCheckIn = new Date(
    Math.min(...date.map((date: any) => new Date(date).getTime()))
  );
  const latestCheckOut = new Date(
    Math.max(...date.map((date: any) => new Date(date).getTime()))
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
  const result = await db.bookings.findFirst({
    where: {
      id: bookingId,
    },
    select: {
      proof_image: true,
    },
  });

  return result;
};

export const getOrderRepository = async (
  whereClause: BookingsWhereInput,
  sort: string | undefined,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const orderList = await db.bookings.findMany({
    where: whereClause,
    orderBy: {
      created_at: isValidSort(sort) && sort === "asc" ? "asc" : "desc",
    },
    include: {
      property: {
        select: {
          main_image: true,
          name: true,
          city: true,
        },
      },
      booking_rooms: {
        include: {
          room: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return orderList;
};

export const findBookingByIdRepository = async (
  bookingId: string,
  identity: { userId: string; tenantId?: string; role: string },
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const where: PrismaNew.bookingsWhereInput = {
    id: bookingId,
  };

  if (identity.role === "tenant" && identity.tenantId) {
    where.property = { tenant_id: identity.tenantId };
  } else {
    where.user_id = identity.userId;
  }

  return prisma.bookings.findFirst({
    where,
    select: {
      id: true,
      status: true,
      check_in_date: true,
      check_out_date: true,
      total_price: true,
      payment_deadline: true,
      property: { select: { name: true, city: true } },
      booking_rooms: { include: { room: { select: { name: true } } } },
      user: { select: { full_name: true, email: true } },
    },
  });
};

export const updateProofImageRepository = async (
  bookingId: string,
  data: ProofImage,
  tx?: Prisma.TransactionClient
) => {
  console.log("Attempting to update booking with ID:", bookingId);
  const db = tx ?? prisma;
  await db.bookings.update({
    where: {
      id: bookingId,
      status: { in: ["waiting_confirmation", "waiting_payment"] },
    },
    data,
  });
};

export const findBookingIncludeBookingRooms = async (
  bookingId: string,
  tx?: Prisma.TransactionClient
) => {
  const db = tx ?? prisma;
  const booking_rooms = await db.bookings.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      booking_rooms: true,
    },
  });

  return booking_rooms;
};

export const acceptBookingPayment = async (
  bookingId: string,
  tenantId: string
): Promise<BookingWithDetails> => {
  try {
    const updatedBooking = await prisma.bookings.update({
      where: {
        id: bookingId,
        status: "waiting_confirmation",
        property: { tenant_id: tenantId },
      },
      data: {
        status: "confirmed",
        paid_at: new Date(),
      },
      include: {
        user: { select: { full_name: true, email: true } },
        property: { select: { name: true, city: true} },
        booking_rooms: { include: { room: { select: { name: true } } } },
      },
    });

    return updatedBooking;
  } catch (error) {
    throw new AppError(
      "Booking not found, not awaiting confirmation, or you are not authorized.",
      404
    );
  }
};
