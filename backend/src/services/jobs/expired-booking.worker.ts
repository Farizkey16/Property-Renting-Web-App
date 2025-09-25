import { Helpers, Task } from "graphile-worker";
import { prisma } from "../../config/prisma";

export const expiredBookings: Task = async function (_payload: unknown, helpers: Helpers) {
  try {
    
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
      helpers.logger.info("No expired bookings found.");
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

    helpers.logger.info(`Successfully expired ${idstoExpire.length} overdue bookings.`)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export default expiredBookings