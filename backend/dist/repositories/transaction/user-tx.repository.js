"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredBookings = exports.checkBookingAndUserId = void 0;
const prisma_1 = require("../../config/prisma");
const checkBookingAndUserId = async (bookingId, userId, tx) => {
    const db = tx ?? prisma_1.prisma;
    const response = await db.bookings.findFirst({
        where: {
            id: bookingId,
            user_id: userId
        }
    });
    return response;
};
exports.checkBookingAndUserId = checkBookingAndUserId;
const getFilteredBookings = async (whereClause, sort, page, limit) => {
    const skip = (page - 1) * limit;
    const [data, totalItems] = await Promise.all([
        prisma_1.prisma.bookings.findMany({
            where: whereClause,
            orderBy: {
                created_at: sort === "asc" ? "asc" : "desc",
            },
            take: limit,
            skip: skip,
            select: {
                id: true,
                check_in_date: true,
                check_out_date: true,
                payment_deadline: true,
                proof_image: true,
                amount: true,
                booking_rooms: {
                    select: {
                        id: true,
                        room_id: true,
                        guests_count: true,
                        nights: true,
                        price_per_night: true,
                        subtotal: true,
                        room: {
                            select: {
                                name: true
                            }
                        }
                    },
                },
                property: {
                    select: {
                        name: true,
                        main_image: true,
                        city: true,
                    },
                },
                status: true,
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
        }),
        prisma_1.prisma.bookings.count({
            where: whereClause
        })
    ]);
    const totalPages = Math.ceil(totalItems / limit);
    return {
        data,
        meta: {
            page,
            limit,
            totalItems,
            totalPages
        }
    };
};
exports.getFilteredBookings = getFilteredBookings;
//# sourceMappingURL=user-tx.repository.js.map