import PgBoss from "pg-boss";
import AppError from "../errors/AppError";
import { expireOverdueBookings } from "./jobs/expired-booking.worker";
import { bookingReminderHandler } from "./jobs/booking-reminder.worker";

let boss: PgBoss | null = null;
export const getBoss = async () => {
  if (!boss) {
    if (!process.env.DATABASE_URL) {
      throw new AppError("DATABASE_URL environment variable is not set.", 400);
    }

    const newBoss = new PgBoss(process.env.DATABASE_URL);
    await newBoss.start();
    console.log("pg-boss connection started successfully.");
    boss = newBoss;
  }
  return boss;
};

const EXPIRE_BOOKINGS_JOB = "expire-overdue-bookings";
const SEND_REMINDER_JOB = "send-booking-reminder";

export const startAllWorkersAndSchedules = async () => {
  try {
    const boss = await getBoss();
    console.log("Setting up pgBoss workers and schedules...");

    console.log("Ensuring queues exist...");
    await boss.createQueue(EXPIRE_BOOKINGS_JOB);
    await boss.createQueue(SEND_REMINDER_JOB);

    await boss.work(EXPIRE_BOOKINGS_JOB, expireOverdueBookings);
    await boss.work(SEND_REMINDER_JOB, bookingReminderHandler);

    await boss.unschedule(EXPIRE_BOOKINGS_JOB);
    await boss.schedule(EXPIRE_BOOKINGS_JOB, "0 9 * * 3"); 
    console.log(`Scheduled job '${EXPIRE_BOOKINGS_JOB}' to run every minute.`);

    await boss.unschedule(SEND_REMINDER_JOB);
    await boss.schedule(SEND_REMINDER_JOB, "0 9 * * *");
    console.log(`Scheduled job '${SEND_REMINDER_JOB}' to run daily at 9 AM.`);

    console.log("All workers and schedules are set up.");
  } catch (error) {
    console.error("Failed to start workers and schedules.")
  }
};

export const scheduler = getBoss;
