"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindProofImage = exports.UpdateRoomAvailability = exports.checkRoomInventory = exports.findBookingRoomsByBookingId = exports.UpdateBookings = exports.ValidateBooking = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ValidateBooking = async (booking_id, tenant_id, tx) => {
    const checkBooking = await tx.bookings.findFirst({
        where: {
            id: booking_id,
            property: {
                tenant_id: tenant_id,
            },
        },
        select: {
            property: true,
            user_id: true,
        },
    });
    if (!checkBooking) {
        throw new AppError_1.default("You can only access your own property.", 401);
    }
};
exports.ValidateBooking = ValidateBooking;
const UpdateBookings = async (booking_id, status, tx) => {
    const db = tx ?? prisma_1.prisma;
    const updateBooking = await db.bookings.update({
        where: {
            id: booking_id,
        },
        data: {
            status: status,
        },
    });
    if (!updateBooking) {
        throw new AppError_1.default("Booking cannot be updated", 400);
    }
    return updateBooking;
};
exports.UpdateBookings = UpdateBookings;
const findBookingRoomsByBookingId = async (bookingId, tx) => {
    const db = tx ?? prisma_1.prisma;
    const bookingRooms = await db.booking_rooms.findMany({
        where: {
            booking_id: bookingId,
        },
        select: {
            booking_id: true,
            room_id: true,
            quantity: true,
            id: true,
            check_in_date: true,
            check_out_date: true,
            guests_count: true,
            nights: true,
            subtotal: true,
            room: {
                select: {
                    total_rooms: true,
                    name: true,
                    property: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return bookingRooms;
};
exports.findBookingRoomsByBookingId = findBookingRoomsByBookingId;
const checkRoomInventory = async (tx, roomId, checkInDate, checkOutDate, requestQuantity) => {
    const db = tx ?? prisma_1.prisma;
    const room = tx.rooms.findUnique({
        where: {
            id: roomId,
        },
        select: {
            total_rooms: true,
        },
    });
    if (!room) {
        throw new AppError_1.default("Room not found", 404);
    }
    const totalInventory = room.total_rooms;
    const overlapBookings = await tx.booking_rooms.findMany({
        where: {
            room_id: roomId,
            booking: {
                status: {
                    in: ["confirmed", "waiting_confirmation", "waiting_payment"],
                },
            },
            check_in_date: {
                lt: new Date(checkOutDate),
            },
            check_out_date: {
                gt: new Date(checkInDate),
            },
        },
        select: {
            quantity: true,
        },
    });
    const bookedQuantity = overlapBookings.reduce((sum, booking) => sum + booking.quantity, 0);
    const availableInventory = totalInventory - bookedQuantity;
    if (requestQuantity > availableInventory) {
        throw new AppError_1.default(`Room is not available. Only ${availableInventory} rooms left.`, 400);
    }
};
exports.checkRoomInventory = checkRoomInventory;
const UpdateRoomAvailability = async (roomId, data, availability, tx) => {
    const earliestCheckIn = new Date(Math.min(...data.map((date) => new Date(date).getTime())));
    const latestCheckOut = new Date(Math.max(...data.map((date) => new Date(date).getTime())));
    const db = tx ?? prisma_1.prisma;
    const roomAvail = await db.room_availability.updateMany({
        where: {
            room_id: roomId,
            date: {
                gte: earliestCheckIn,
                lt: latestCheckOut,
            },
        },
        data: {
            is_available: availability,
        },
    });
    return roomAvail;
};
exports.UpdateRoomAvailability = UpdateRoomAvailability;
const FindProofImage = async (bookingId, tx) => {
    const db = tx ?? prisma_1.prisma;
    const result = await db.bookings.findUnique({
        where: {
            id: bookingId,
        },
        select: {
            proof_image: true,
        },
    });
    if (!result) {
        throw new AppError_1.default("This booking does not exist.", 404);
    }
    return result;
};
exports.FindProofImage = FindProofImage;
//# sourceMappingURL=transaction.repository.js.map