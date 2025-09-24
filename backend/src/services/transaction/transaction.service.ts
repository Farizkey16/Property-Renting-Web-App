import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { findBookingRoomsByBookingId, updateProofImageRepository } from "../../repositories/transaction/tenant-tx.repository";
import { sendEmail } from "../email.service";
import {
  getEmailAndFullnameById,
} from "../../repositories/user/user.respository";
import {
  BOOKING_CONFIRMATION_TEMPLATE_SINGLE,
  BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE,
  BOOKING_REJECTION_TEMPLATE_SINGLE,
} from "../../utils/emailTemplates";
import { scheduler } from "../scheduler.service";
import {
  FormattedRoom,
  BookingTemplateData,
  BookingRoomCompleteType,
  BookingWithDetails,
} from "../../types/transaction/transactions.types";
import { handleUpload } from "../../config/cloudinary";
import { checkBookingAndUserId } from "../../repositories/transaction/user-tx.repository";

type BookingRoomType = Awaited<
  ReturnType<typeof findBookingRoomsByBookingId>
>[0];

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
    email: user.email
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
  const bookings = await findBookingRoomsByBookingId(bookingId);
  const firstBooking = bookings[0].created_at

  if (bookings.length === 0) {
  return; 
}
  
  const reminderDate = new Date(firstBooking);

  reminderDate.setMinutes(reminderDate.getDate() + 3);

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
    email: user.email
  };

  await sendEmail(
    user.email,
    "Payment Rejected",
    BOOKING_REJECTION_TEMPLATE_SINGLE(templateData)
  );
};

export const getRoomAmount = async (roomId: string, checkIn: Date, checkOut: Date) => {

const [room, overlapBookings] = await Promise.all([
  prisma.rooms.findUnique({
    where: {
      id: roomId
    }, select: {
      total_rooms: true
    }
  }),

  prisma.booking_rooms.findMany({
    where: {
      room_id: roomId,
      booking: {
        status: {
          in: ["waiting_confirmation", "confirmed", "waiting_payment"]
        }
      },
      check_in_date: {
        lt: checkOut
      },
      check_out_date: {
        gt: checkIn
      }
    },
    select: {
      quantity: true
    }
  })
])

if(!room){
    return 0;
  }

  const totalInventory = room.total_rooms
  const bookedQuantity = overlapBookings.reduce((sum, booking) => sum + booking.quantity, 0)

  const availableInventory = totalInventory - bookedQuantity

  return Math.max(0, availableInventory)


}

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


