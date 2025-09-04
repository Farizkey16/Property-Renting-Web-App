import { Job } from "pg-boss";
import { prisma } from "../../config/prisma";
import { scheduler } from "../scheduler.service";
import { sendReminder } from "../email.service";
import { BOOKING_CONFIRMATION_TEMPLATE_SINGLE, BOOKING_REMINDER_TEMPLATE, BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE, BOOKING_REMINDER_TEMPLATE_MULTIPLE } from "../../utils/emailTemplates";
import { BookingTemplateData } from "../../types/transaction/transactions.types";
import { getBoss } from "../scheduler.service";

interface ReminderJobType {
  bookingId: string;
  
}

const BOOKING_REMINDER = "send-booking-reminder";

export const bookingReminderHandler = async (job: Job<ReminderJobType>[]) => {

  for (const jb of job) {
      const { bookingId } = jb.data;

      try {
        console.log(`Processing ${jb.id} for booking ${bookingId}`);

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
                            name: true
                        }
                    }
                }
            },
          },
        });

        // Validate Booking Existence
        if (!booking || booking.status !== "confirmed" || booking.booking_rooms.length === 0 || !booking.booking_rooms) {
          console.log(
            `Skipping booking ${bookingId} of ${jb.id}, booking is not found.`
          );
          continue;
        }

        // Define Data
        const templateData: BookingTemplateData = {
            guestName: booking.user.full_name,
            booking_id: bookingId,
            propertyName: booking.property.name,
            rooms: booking.booking_rooms.map(room => ({
                name: room.room.name,
                check_in_date: [room.check_in_date.toISOString().split("T")[0]],
                check_out_date: [room.check_out_date.toISOString().split("T")[0]],
                guests_count: room.guests_count,
                quantity: room.quantity,
                subtotal: typeof room.subtotal === "number" ? room.subtotal : Number(room.subtotal),
                room_id: room.room_id
            }))
        }


        // Handling Single or Multiple Bookings
        let emailHtml

        if (booking.booking_rooms.length > 1) {
            console.log(`Booking ${bookingId} has multiple rooms. Using multiple bookings template.`);
            emailHtml = BOOKING_REMINDER_TEMPLATE_MULTIPLE(templateData);
        } else {
            emailHtml = BOOKING_REMINDER_TEMPLATE(
                booking.user.full_name,
                bookingId,
                booking.check_in_date.toISOString().split("T")[0],
                booking.check_out_date.toISOString().split("T")[0],
                booking.property.name
            );
        }

        // Sending Email

        await sendReminder(
          booking.user.email,
          `Reminder: Your Stay at ${booking.property.name}`,
          emailHtml
        );
      } catch (error) {
        console.log(`Failed processing ${jb.id} for booking ${bookingId}`);
        throw error;
      }
    }

}

// async function startWorker() {
//   const boss = await getBoss();

//   console.log("Worker started. Listening for 'send-booking-reminder' jobs...");

//   await boss.work<ReminderJobType>(BOOKING_REMINDER, {batchSize: 10}, bookingReminderHandler);
// }

// startWorker().catch((error) => {
//   console.error("Worker failed to start:", error);
//   process.exit(1)
// });
