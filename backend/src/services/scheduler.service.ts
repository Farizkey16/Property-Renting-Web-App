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

    const newBoss = new PgBoss({
      connectionString: process.env.DATABASE_URL, }); // timezone?
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
    await boss.createQueue("send-booking-reminder");

    await boss.work(EXPIRE_BOOKINGS_JOB, expireOverdueBookings);
    await boss.work("send-booking-reminder", bookingReminderHandler)

    await boss.unschedule(EXPIRE_BOOKINGS_JOB);
    await boss.schedule(EXPIRE_BOOKINGS_JOB, "0 9 * * *"); 
    console.log(`Scheduled job '${EXPIRE_BOOKINGS_JOB}' to run every 9 AM.`);

    console.log("All workers and schedules are set up.");
  } catch (error) {
    console.error("Failed to start workers and schedules.")
  }
};

export const scheduler = getBoss;
