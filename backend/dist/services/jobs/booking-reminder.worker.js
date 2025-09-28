"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingReminder = void 0;
const prisma_1 = require("../../config/prisma");
const email_service_1 = require("../email.service");
const emailTemplates_1 = require("../../utils/emailTemplates");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bookingReminder = async (payload, helpers) => {
    try {
        const { bookingId } = payload;
        if (!bookingId) {
            throw new AppError_1.default("[bookingReminder]: Id is required.", 400);
        }
        helpers.logger.info(`Sending reminder for booking ${bookingId}...`);
        const booking = await prisma_1.prisma.bookings.findUnique({
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
        if (!booking ||
            booking.status !== "confirmed" ||
            booking.booking_rooms.length === 0 ||
            !booking.booking_rooms) {
            throw Error("No booking(s) found.");
        }
        // Define Data
        const templateData = {
            guestName: booking.user.full_name,
            email: booking.user.email,
            booking_id: bookingId,
            propertyName: booking.property.name,
            rooms: booking.booking_rooms.map((room) => ({
                name: room.room.name,
                check_in_date: room.check_in_date.toISOString().split("T")[0] ?? '',
                check_out_date: room.check_out_date.toISOString().split("T")[0] ?? '',
                guests_count: room.guests_count,
                nights: room.nights,
                quantity: room.quantity,
                subtotal: typeof room.subtotal === "number"
                    ? room.subtotal
                    : Number(room.subtotal),
                room_id: room.room_id,
            })),
        };
        // Handling Single or Multiple Bookings
        let emailHtml;
        if (booking.booking_rooms.length > 1) {
            console.log(`Booking ${bookingId} has multiple rooms. Using multiple bookings template.`);
            emailHtml = (0, emailTemplates_1.BOOKING_REMINDER_TEMPLATE_MULTIPLE)(templateData);
        }
        else {
            emailHtml = (0, emailTemplates_1.BOOKING_REMINDER_TEMPLATE)(templateData);
        }
        await (0, email_service_1.sendReminder)(booking.user.email, `Reminder: Your Stay at ${booking.property.name}`, emailHtml);
    }
    catch (error) {
        console.log("Failed at processing the job.");
        throw error;
    }
};
exports.bookingReminder = bookingReminder;
//# sourceMappingURL=booking-reminder.worker.js.map