import { Task, Helpers } from "graphile-worker";
import { prisma } from "../src/config/prisma";
import { BookingTemplateData } from "../src/types/transaction/transactions.types";
import {
  BOOKING_REMINDER_TEMPLATE,
  BOOKING_REMINDER_TEMPLATE_MULTIPLE,
} from "../src/utils/emailTemplates";
import { sendReminder } from "../src/services/email.service";

interface RoomsReminderInterface {
  name: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  quantity: number;
  subtotal: number;
  room_id: string;
}

interface BookingReminderInterface {
  guestName: string;
  email: string;
  booking_id: string;
  propertyName: string;
  rooms: RoomsReminderInterface;
}

interface Payload {
  bookingId: string;
}

export const bookingReminder: Task = async function (payload: unknown, helpers: Helpers) {
  try {
    const { bookingId } = payload as Payload;

    // Fetch Booking from DB
    const booking = await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
        check_in_date: true,
        check_out_date: true,
        property: {
          select: {
            name: true,
          },
        },
        status: true,
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

    if (
      booking?.booking_rooms.length === 0 ||
      !booking ||
      booking.status !== "confirmed" ||
      !booking.booking_rooms
    ) {
      throw new Error(`Booking with ID ${bookingId} not found.`);
    }

    const templateData: BookingTemplateData = {
      guestName: booking.user.full_name,
      email: booking.user.email,
      booking_id: bookingId,
      propertyName: booking.property.name,
      rooms: booking.booking_rooms.map((room) => ({
        name: room.room.name,
        check_in_date: room.check_in_date.toISOString().split("T")[0],
        check_out_date: room.check_out_date.toISOString().split("T")[0],
        guests_count: room.guests_count,
        nights: room.nights,
        quantity: room.quantity,
        subtotal:
          typeof room.subtotal === "number"
            ? room.subtotal
            : Number(room.subtotal),
        room_id: room.room_id,
      })),
    };

    let emailHtml;

    if (booking.booking_rooms.length > 1) {
      console.log(
        `Booking ${bookingId} has multiple rooms. Using multiple bookings template.`
      );
      emailHtml = BOOKING_REMINDER_TEMPLATE_MULTIPLE(templateData);
    } else {
      emailHtml = BOOKING_REMINDER_TEMPLATE(
        templateData
      );
    }

    // Sending Email
    console.log(
      `Attempting to send reminder for booking ${bookingId} to ${booking.user.email}...`
    );

    await sendReminder(
      booking.user.email,
      `Reminder: Your Stay at ${booking.property.name}`,
      emailHtml
    );

    console.log(`Successfully sent reminder for booking ${bookingId}.`);
  } catch (error) {
    console.log("Failed at processing the job.")
    throw error
  }
};

export default bookingReminder


