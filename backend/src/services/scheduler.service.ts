
import { expiredBookings } from "./jobs/expired-booking.worker";
import { bookingReminder } from "./jobs/booking-reminder.worker";
import { run } from "graphile-worker";
import type { TaskList } from "graphile-worker";

const taskList = {
  "send-booking-reminder": bookingReminder,
  "expire-overdue-bookings": expiredBookings
};

const EXPIRE_BOOKINGS_JOB = "expire-overdue-bookings";
const SEND_REMINDER_JOB = "send-booking-reminder";
const SEND_CONFIRMATION_JOB = "send-confirmation-job"

export const startAllWorkersAndSchedules = async () => {
  try {

    const taskList: TaskList = {
      [EXPIRE_BOOKINGS_JOB]: expiredBookings,
      [SEND_REMINDER_JOB]: bookingReminder
    }

    const runner = run({
      connectionString: process.env.DIRECT_URL,
      concurrency: 5,
      pollInterval: 1000,
      taskList: taskList,
      crontabFile: "crontab"
    })

    runner.catch((err) => {
    console.error("Graphile Worker failed to start!", err);
    process.exit(1);
  });

    console.log("Graphile Worker is running and watching for jobs and schedules.");
    return runner;
  } catch (error) {
    console.error("Failed to start workers and schedules.");
  }
};


