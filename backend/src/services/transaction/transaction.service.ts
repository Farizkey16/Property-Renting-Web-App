import { Prisma } from "@prisma/client";
import AppError from "../../errors/AppError";
import { findBookingRoomsByBookingId, updateProofImageRepository } from "../../repositories/transaction/tenant-tx.repository";
import { sendEmail } from "../email.service";
import {
  findUserById,
  getEmailAndFullnameById,
} from "../../repositories/user/user.respository";
import {
  BOOKING_CONFIRMATION_TEMPLATE_SINGLE,
  BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE,
  BOOKING_REJECTION_TEMPLATE_SINGLE,
} from "../../utils/emailTemplates";
import { scheduler } from "../scheduler.service";
import {
  FindRooms,
  Overlapping,
  FormattedRoom,
  BookingTemplateData,
  BookingRoomCompleteType,
  BookingWithDetails,
} from "../../types/transaction/transactions.types";
import { NextFunction } from "express";
import { handleUpload } from "../../config/cloudinary";
import { checkBookingAndUserId } from "../../repositories/transaction/user-tx.repository";

type BookingRoomType = Awaited<
  ReturnType<typeof findBookingRoomsByBookingId>
>[0];

export const availableRooms = (
  findRooms: FindRooms[],
  overlappingBooking: Overlapping[],
  tx: Prisma.TransactionClient
) => {
  const availability = findRooms.map((br) => {
    const bookingQty = overlappingBooking
      .filter((ovr) => ovr.room_id === br.room_id)
      .reduce((acc, num) => acc + num.quantity, 0);

    if (bookingQty + br.quantity > br.room.total_rooms) {
      throw new AppError("Not enough rooms available to book.", 409);
    }

    return {
      room_id: br.room_id,
      available: br.room.total_rooms - bookingQty,
    };
  });

  return availability;
};

export const sendUserBookingConfirmation = async (
  booking: BookingWithDetails
) => {
  
  const user = booking.user
  const propertyName = booking.property.name

  if (!user || !propertyName || booking.booking_rooms.length === 0) {
      throw new AppError("Cannot send confirmation: booking data is incomplete.", 500);
  }

  const formattedRooms: FormattedRoom[] = (
    booking.booking_rooms.map((dbRoom) => {
    return {
      name: dbRoom.room.name,
      room_id: dbRoom.room_id,
      check_in_date: dbRoom.check_in_date.toISOString().split("T")[0],
      check_out_date: dbRoom.check_out_date.toISOString().split("T")[0],
      guests_count: dbRoom.guests_count,
      quantity: dbRoom.quantity,
      subtotal: Number(dbRoom.subtotal),
    };
  }));

  const templateData: BookingTemplateData = {
    guestName: user.full_name,
    booking_id: booking.id,
    propertyName: propertyName,
    rooms: formattedRooms,
  };

  await sendEmail(
    user.email,
    "Your Booking Details",
    formattedRooms.length > 1
      ? BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE(templateData)
      : BOOKING_CONFIRMATION_TEMPLATE_SINGLE(templateData)
  );
};

export const scheduleReminder = async (bookingId: string) => {
  const findCheckInDate = findBookingRoomsByBookingId(bookingId);

  interface BookingRoomCheckIn {
    check_in_date: Date[];
  }

  const checkInDate: Date[] = (
    (await findCheckInDate) as BookingRoomCheckIn[]
  ).map((ci) => ci.check_in_date[0]);
  const reminderDate = new Date(checkInDate[0]);

  reminderDate.setDate(reminderDate.getDate() - 1);
  reminderDate.setHours(9, 0, 0, 0);

  const boss = await scheduler();
  await boss.send(
    "send-booking-reminder",
    {
      bookingId: bookingId,
    },
    {
      startAfter: reminderDate,
      singletonKey: `reminder-${bookingId}`,
    }
  );
};

export const sendRejectionNotification = async (
  bookingId: string,
  userId: string
) => {
  const bookingRoomsFromDb = await findBookingRoomsByBookingId(bookingId);
  const user = await getEmailAndFullnameById(userId);
  const propertyName = bookingRoomsFromDb[0].room.property.name;

  const formattedRooms: FormattedRoom[] = (
    bookingRoomsFromDb as BookingRoomCompleteType[]
  ).map((dbRoom) => {
    return {
      name: dbRoom.room.name,
      room_id: dbRoom.room_id,
      check_in_date: dbRoom.check_in_date.toISOString().split("T")[0],
      check_out_date: dbRoom.check_out_date.toISOString().split("T")[0],
      guests_count: dbRoom.guests_count,
      quantity: dbRoom.quantity,
      subtotal: dbRoom.subtotal,
    };
  });

  const templateData: BookingTemplateData = {
    guestName: user.fullname,
    booking_id: bookingId,
    propertyName: propertyName,
    rooms: formattedRooms,
  };

  await sendEmail(
    user.email,
    "Payment Rejected",
    BOOKING_REJECTION_TEMPLATE_SINGLE(templateData)
  );
};

export const proofUploadService = async (
  userId: string,
  bookingId: string,
  file?: Express.Multer.File
) => {

  const existingUserBooking = await checkBookingAndUserId(bookingId, userId);
  if (!existingUserBooking) {
    throw new AppError("User tied with certain booking ID is not found.", 404);
  }

  let uploadProof = null;
  if (file) {
    uploadProof = await handleUpload(file)
  }

  const final_img = await updateProofImageRepository(bookingId, {proof_image: uploadProof?.secure_url, status: "waiting_confirmation"})

  return final_img
};


