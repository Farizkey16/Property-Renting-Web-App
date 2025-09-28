"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptBookingPayment = exports.findBookingIncludeBookingRooms = exports.updateProofImageRepository = exports.findBookingByIdRepository = exports.getOrderRepository = exports.FindProofImage = exports.UpdateRoomAvailability = exports.findBookingRoomsByBookingId = exports.UpdateBookings = exports.ValidateBooking = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const transactions_types_1 = require("../../types/transaction/transactions.types");
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
const UpdateBookings = async (bookingId, status, tx) => {
    const db = tx ?? prisma_1.prisma;
    const updateBooking = await db.bookings.update({
        where: {
            id: bookingId,
        },
        data: {
            status: status,
        },
        include: {
            booking_rooms: true
        }
    });
    return updateBooking.user_id;
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
            created_at: true,
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
const UpdateRoomAvailability = async (roomId, date, availability, tx) => {
    const earliestCheckIn = new Date(Math.min(...date.map((date) => new Date(date).getTime())));
    const latestCheckOut = new Date(Math.max(...date.map((date) => new Date(date).getTime())));
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
    const result = await db.bookings.findFirst({
        where: {
            id: bookingId,
        },
        select: {
            proof_image: true,
        },
    });
    return result;
};
exports.FindProofImage = FindProofImage;
const getOrderRepository = async (whereClause, sort, tx) => {
    const db = tx ?? prisma_1.prisma;
    const orderList = await db.bookings.findMany({
        where: whereClause,
        orderBy: {
            created_at: (0, transactions_types_1.isValidSort)(sort) && sort === "asc" ? "asc" : "desc",
        },
        include: {
            property: {
                select: {
                    main_image: true,
                    name: true,
                    city: true,
                },
            },
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
    return orderList;
};
exports.getOrderRepository = getOrderRepository;
const findBookingByIdRepository = async (bookingId, identity, tx) => {
    const db = tx ?? prisma_1.prisma;
    const where = {
        id: bookingId,
    };
    if (identity.role === "tenant" && identity.tenantId) {
        where.property = { tenant_id: identity.tenantId };
    }
    else {
        where.user_id = identity.userId;
    }
    return prisma_1.prisma.bookings.findFirst({
        where,
        select: {
            id: true,
            status: true,
            check_in_date: true,
            check_out_date: true,
            total_price: true,
            payment_deadline: true,
            property: { select: { name: true, city: true } },
            booking_rooms: { include: { room: { select: { name: true } } } },
            user: { select: { full_name: true, email: true } },
        },
    });
};
exports.findBookingByIdRepository = findBookingByIdRepository;
const updateProofImageRepository = async (bookingId, data, tx) => {
    console.log("Attempting to update booking with ID:", bookingId);
    const db = tx ?? prisma_1.prisma;
    await db.bookings.update({
        where: {
            id: bookingId,
            status: { in: ["waiting_confirmation", "waiting_payment"] },
        },
        data,
    });
};
exports.updateProofImageRepository = updateProofImageRepository;
const findBookingIncludeBookingRooms = async (bookingId, tx) => {
    const db = tx ?? prisma_1.prisma;
    const booking_rooms = await db.bookings.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            booking_rooms: true,
        },
    });
    return booking_rooms;
};
exports.findBookingIncludeBookingRooms = findBookingIncludeBookingRooms;
const acceptBookingPayment = async (bookingId, tenantId) => {
    try {
        const updatedBooking = await prisma_1.prisma.bookings.update({
            where: {
                id: bookingId,
                status: "waiting_confirmation",
                property: { tenant_id: tenantId },
            },
            data: {
                status: "confirmed",
                paid_at: new Date(),
            },
            include: {
                user: { select: { full_name: true, email: true } },
                property: { select: { name: true, city: true } },
                booking_rooms: { include: { room: { select: { name: true } } } },
            },
        });
        return updatedBooking;
    }
    catch (error) {
        throw new AppError_1.default("Booking not found, not awaiting confirmation, or you are not authorized.", 404);
    }
};
exports.acceptBookingPayment = acceptBookingPayment;
//# sourceMappingURL=tenant-tx.repository.js.map