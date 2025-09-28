"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proofUploadService = exports.getRoomAmount = exports.sendRejectionNotification = exports.scheduleReminder = exports.sendUserBookingConfirmation = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tenant_tx_repository_1 = require("../../repositories/transaction/tenant-tx.repository");
const email_service_1 = require("../email.service");
const user_respository_1 = require("../../repositories/user/user.respository");
const emailTemplates_1 = require("../../utils/emailTemplates");
const cloudinary_1 = require("../../config/cloudinary");
const user_tx_repository_1 = require("../../repositories/transaction/user-tx.repository");
const graphile_worker_1 = require("graphile-worker");
const sendUserBookingConfirmation = async (booking) => {
    const user = booking.user;
    const propertyName = booking.property.name;
    if (!user || !propertyName || booking.booking_rooms.length === 0) {
        throw new AppError_1.default("Cannot send confirmation: booking data is incomplete.", 500);
    }
    const formattedRooms = (booking.booking_rooms.map((dbRoom) => {
        return {
            name: dbRoom.room.name,
            room_id: dbRoom.room_id,
            check_in_date: dbRoom.check_in_date.toISOString().split("T")[0] ?? '',
            check_out_date: dbRoom.check_out_date.toISOString().split("T")[0] ?? '',
            guests_count: dbRoom.guests_count,
            quantity: dbRoom.quantity,
            subtotal: Number(dbRoom.subtotal),
        };
    }));
    const templateData = {
        guestName: user.full_name,
        booking_id: booking.id,
        propertyName: propertyName,
        rooms: formattedRooms,
        email: user.email
    };
    await (0, email_service_1.sendEmail)(user.email, "Your Booking Details", formattedRooms.length > 1
        ? (0, emailTemplates_1.BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE)(templateData)
        : (0, emailTemplates_1.BOOKING_CONFIRMATION_TEMPLATE_SINGLE)(templateData));
};
exports.sendUserBookingConfirmation = sendUserBookingConfirmation;
const scheduleReminder = async (bookingId) => {
    const bookings = await (0, tenant_tx_repository_1.findBookingRoomsByBookingId)(bookingId);
    const firstBooking = bookings[0].created_at;
    if (bookings.length === 0) {
        return;
    }
    await (0, graphile_worker_1.quickAddJob)({ connectionString: process.env.DIRECT_URL }, "send-booking-reminder", { bookingId: bookingId });
};
exports.scheduleReminder = scheduleReminder;
const sendRejectionNotification = async (bookingId, userId) => {
    const bookingRoomsFromDb = await (0, tenant_tx_repository_1.findBookingRoomsByBookingId)(bookingId);
    const user = await (0, user_respository_1.getEmailAndFullnameById)(userId);
    const propertyName = bookingRoomsFromDb[0].room.property.name;
    const formattedRooms = bookingRoomsFromDb.map((dbRoom) => {
        return {
            name: dbRoom.room.name,
            room_id: dbRoom.room_id,
            check_in_date: dbRoom.check_in_date.toISOString().split("T")[0] ?? '',
            check_out_date: dbRoom.check_out_date.toISOString().split("T")[0] ?? '',
            guests_count: dbRoom.guests_count,
            quantity: dbRoom.quantity,
            subtotal: dbRoom.subtotal,
        };
    });
    const templateData = {
        guestName: user.fullname,
        booking_id: bookingId,
        propertyName: propertyName,
        rooms: formattedRooms,
        email: user.email
    };
    await (0, email_service_1.sendEmail)(user.email, "Payment Rejected", (0, emailTemplates_1.BOOKING_REJECTION_TEMPLATE_SINGLE)(templateData));
};
exports.sendRejectionNotification = sendRejectionNotification;
const getRoomAmount = async (roomId, checkIn, checkOut) => {
    const [room, overlapBookings] = await Promise.all([
        prisma_1.prisma.rooms.findUnique({
            where: {
                id: roomId
            }, select: {
                total_rooms: true
            }
        }),
        prisma_1.prisma.booking_rooms.findMany({
            where: {
                room_id: roomId,
                booking: {
                    status: {
                        in: ["waiting_confirmation", "confirmed", "waiting_payment"]
                    }
                },
                check_in_date: {
                    lt: checkOut
                },
                check_out_date: {
                    gt: checkIn
                }
            },
            select: {
                quantity: true
            }
        })
    ]);
    if (!room) {
        return 0;
    }
    const totalInventory = room.total_rooms;
    const bookedQuantity = overlapBookings.reduce((sum, booking) => sum + booking.quantity, 0);
    const availableInventory = totalInventory - bookedQuantity;
    return Math.max(0, availableInventory);
};
exports.getRoomAmount = getRoomAmount;
const proofUploadService = async (userId, bookingId, file) => {
    const existingUserBooking = await (0, user_tx_repository_1.checkBookingAndUserId)(bookingId, userId);
    if (!existingUserBooking) {
        throw new AppError_1.default("User tied with certain booking ID is not found.", 404);
    }
    let uploadProof = null;
    if (file) {
        uploadProof = await (0, cloudinary_1.handleUpload)(file);
    }
    const final_img = await (0, tenant_tx_repository_1.updateProofImageRepository)(bookingId, { proof_image: uploadProof?.secure_url, status: "waiting_confirmation" });
    return final_img;
};
exports.proofUploadService = proofUploadService;
//# sourceMappingURL=transaction.service.js.map