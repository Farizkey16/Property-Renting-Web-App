
import { prisma } from "../../config/prisma";
import { sendReminder } from "../email.service";
import {
  BOOKING_REMINDER_TEMPLATE,
  BOOKING_REMINDER_TEMPLATE_MULTIPLE,
} from "../../utils/emailTemplates";
import { BookingTemplateData } from "../../types/transaction/transactions.types";
import { Task, Helpers } from "graphile-worker";

interface ReminderJobType {
  bookingId: string;
}

export const bookingReminder: Task = async (
  payload: unknown,
  helpers: Helpers
) => {
  try {
    const { bookingId } = payload as ReminderJobType;
    helpers.logger.info(`Sending reminder for booking ${bookingId}...`);

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

    // Validate Booking Existence
    if (
      !booking ||
      booking.status !== "confirmed" ||
      booking.booking_rooms.length === 0 ||
      !booking.booking_rooms
    ) {
      throw Error("No booking(s) found.");
    }

    // Define Data
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

    // Handling Single or Multiple Bookings
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

    await sendReminder(
      booking.user.email,
      `Reminder: Your Stay at ${booking.property.name}`,
      emailHtml
    );
  } catch (error) {
    console.log("Failed at processing the job.");
    throw error;
  }
};

