import { prisma } from "../../config/prisma";
import { getBoss } from "../scheduler.service";

const EXPIRE_BOOKINGS_JOB = "expire-overdue-bookings";

export const expireOverdueBookings = async () => {
  try {
    console.log("Running scheduled job: Checking for expired bookings...");

    const now = new Date();

    const overdueBookings = await prisma.bookings.findMany({
      where: {
        status: "waiting_payment",
        payment_deadline: {
          lt: now,
        },
      },
    });

    if (overdueBookings.length === 0) {
      console.log("No expired bookings found.");
      return;
    }

    const idstoExpire = overdueBookings.map((o) => o.id);

    // Update all bookings from ID
    await prisma.bookings.updateMany({
      where: {
        id: {
          in: idstoExpire,
        },
      },
      data: {
        status: "expired",
      },
    });

    console.log(
      `[${EXPIRE_BOOKINGS_JOB}] successfully expired ${idstoExpire.length} bookings.`
    );
  } catch (error) {
    console.error(`Error running the [${EXPIRE_BOOKINGS_JOB}] job:`, error);
  }
};
