import type { Task, Helpers } from "graphile-worker";
import { sendUserBookingConfirmation } from "../transaction/transaction.service";
import { Prisma } from "../../../prisma/generated/client";

export const bookingWithDetailsArgs = {
  include: {
    user: { select: { full_name: true, email: true } },
    property: { select: { name: true, city: true} },
    booking_rooms: { include: { room: { select: { name: true } } } },
  },
};

export type BookingWithDetails = Prisma.bookingsGetPayload<typeof bookingWithDetailsArgs>

export const sendConfirmationEmail: Task = async (
  payload: unknown,
  helpers: Helpers
) => {
  try {
    // Use the imported type to safely cast the payload.
    const bookingData = payload as BookingWithDetails;

    if (!bookingData || !bookingData.id) {
        throw new Error("Invalid bookingData in payload");
    }

    helpers.logger.info(`Sending confirmation email for booking ${bookingData.id}...`);


    await sendUserBookingConfirmation(bookingData);

    helpers.logger.info(`Successfully sent confirmation for booking ${bookingData.id}.`);
  
  } catch (error) {
    helpers.logger.error("Failed at processing 'send-confirmation-email' job.", { error });
    throw error;
  }
};

export default sendConfirmationEmail;