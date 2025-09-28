"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAllWorkersAndSchedules = void 0;
const expired_booking_worker_1 = require("./jobs/expired-booking.worker");
const booking_reminder_worker_1 = require("./jobs/booking-reminder.worker");
const graphile_worker_1 = require("graphile-worker");
const taskList = {
    "send-booking-reminder": booking_reminder_worker_1.bookingReminder,
    "expire-overdue-bookings": expired_booking_worker_1.expiredBookings
};
const EXPIRE_BOOKINGS_JOB = "expire-overdue-bookings";
const SEND_REMINDER_JOB = "send-booking-reminder";
const SEND_CONFIRMATION_JOB = "send-confirmation-job";
const startAllWorkersAndSchedules = async () => {
    try {
        const taskList = {
            [EXPIRE_BOOKINGS_JOB]: expired_booking_worker_1.expiredBookings,
            [SEND_REMINDER_JOB]: booking_reminder_worker_1.bookingReminder
        };
        const runner = (0, graphile_worker_1.run)({
            connectionString: process.env.DIRECT_URL,
            concurrency: 5,
            pollInterval: 1000,
            taskList: taskList,
            crontabFile: "crontab"
        });
        runner.catch((err) => {
            console.error("Graphile Worker failed to start!", err);
            process.exit(1);
        });
        console.log("Graphile Worker is running and watching for jobs and schedules.");
        return runner;
    }
    catch (error) {
        console.error("Failed to start workers and schedules.");
    }
};
exports.startAllWorkersAndSchedules = startAllWorkersAndSchedules;
//# sourceMappingURL=scheduler.service.js.map