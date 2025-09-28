"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomByIdRepository = exports.updateRoomByIdRepository = exports.deleteRoomByIdRepository = exports.unBlockAllRoomsByTenantRepository = exports.blockAllRoomsByTenantRepository = exports.findByRoomIdAndDateRangeRepository = exports.findByRoomIdRepository = exports.findRoomByIdRepository = exports.getRoomByPropertyAndNameRepositoryDetail = exports.getRoomByPropertyAndNameRepository = exports.findAllRoomsRepository = exports.findRoomRepository = exports.getRoomAvailabilityWithPriceRepository = exports.getRoomDefaultAvailabilityWithPriceRepository = exports.createRoomAvailability = exports.createRoomRepository = void 0;
const prisma_1 = require("../../config/prisma");
const library_1 = require("@prisma/client/runtime/library");
const dayjs_1 = __importDefault(require("../../utils/dayjs"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const LOCAL_TZ = "Asia/Jakarta";
const createRoomRepository = async (data) => {
    return await prisma_1.prisma.rooms.create({
        data: {
            property_id: data.property_id,
            name: data.name,
            description: data.description,
            base_price: data.base_price,
            capacity: data.capacity,
            image: data.image,
            total_rooms: data.total_rooms,
            room_images: {
                create: data.room_images || [],
            },
        },
        include: { room_images: true },
    });
};
exports.createRoomRepository = createRoomRepository;
const createRoomAvailability = async (room_id, months = 6) => {
    let today = (0, dayjs_1.default)().tz(LOCAL_TZ).startOf("day");
    const endDate = today.add(months, "month");
    const availabilityData = [];
    for (let date = today; date.isBefore(endDate); date = date.add(1, "day")) {
        availabilityData.push({
            room_id,
            date: date.toDate(),
            is_available: true,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
    return await prisma_1.prisma.room_availability.createMany({
        data: availabilityData,
        skipDuplicates: true,
    });
};
exports.createRoomAvailability = createRoomAvailability;
const getRoomDefaultAvailabilityWithPriceRepository = async (room_id, weekend_peak) => {
    const room = await prisma_1.prisma.rooms.findUnique({
        where: { id: room_id },
        include: { room_availability: true },
    });
    if (!room)
        return [];
    const base_price = new library_1.Decimal(room.base_price);
    const availabilityWithPrice = room.room_availability.map((item) => {
        const day = (0, dayjs_1.default)(item.date).tz(LOCAL_TZ).day();
        let price = base_price;
        if (day === 0 || day === 6) {
            if (weekend_peak) {
                price =
                    weekend_peak.type === "percentage"
                        ? base_price.plus(base_price.mul(weekend_peak.value).div(100))
                        : base_price.plus(new library_1.Decimal(weekend_peak.value));
            }
        }
        return {
            ...item,
            price: price.toNumber(),
        };
    });
    return availabilityWithPrice;
};
exports.getRoomDefaultAvailabilityWithPriceRepository = getRoomDefaultAvailabilityWithPriceRepository;
const getRoomAvailabilityWithPriceRepository = async (room_id, checkIn, checkOut, weekend_peak) => {
    const startDate = (0, dayjs_1.default)(checkIn).tz(LOCAL_TZ).startOf("day").toDate();
    const endDate = (0, dayjs_1.default)(checkOut).tz(LOCAL_TZ).startOf("day").toDate();
    const room = await prisma_1.prisma.rooms.findUnique({
        where: { id: room_id, deleted_at: null },
        include: { peak_season_rates: true },
    });
    if (!room)
        return [];
    const availabilities = await prisma_1.prisma.room_availability.findMany({
        where: {
            room_id,
            date: { gte: startDate, lt: endDate },
        },
        orderBy: { date: "asc" },
    });
    const base_price = new library_1.Decimal(room.base_price);
    let total = new library_1.Decimal(0);
    const availabilityWithPrice = availabilities.map((item) => {
        const day = (0, dayjs_1.default)(item.date).tz(LOCAL_TZ).day();
        let price = base_price;
        const peak = room.peak_season_rates.find((rate) => (0, dayjs_1.default)(item.date).tz(LOCAL_TZ).isSameOrAfter(rate.start_date, "day") &&
            (0, dayjs_1.default)(item.date).tz(LOCAL_TZ).isSameOrBefore(rate.end_date, "day"));
        if (peak) {
            price =
                peak.price_change_type === "percentage"
                    ? base_price.plus(base_price.mul(peak.price_change_value).div(100))
                    : base_price.plus(new library_1.Decimal(peak.price_change_value));
        }
        else if ((day === 0 || day === 6) && weekend_peak) {
            price =
                weekend_peak.type === "percentage"
                    ? base_price.plus(base_price.mul(weekend_peak.value).div(100))
                    : base_price.plus(new library_1.Decimal(weekend_peak.value));
        }
        total = total.plus(price);
        return {
            ...item,
            price: price.toNumber(),
        };
    });
    return {
        dates: availabilityWithPrice,
        total: total.toNumber(),
    };
};
exports.getRoomAvailabilityWithPriceRepository = getRoomAvailabilityWithPriceRepository;
const findRoomRepository = async (property_id) => {
    return await prisma_1.prisma.rooms.findMany({
        where: { property_id, deleted_at: null },
        include: {
            property: true,
        },
    });
};
exports.findRoomRepository = findRoomRepository;
const findAllRoomsRepository = async () => {
    return await prisma_1.prisma.rooms.findMany({
        include: {
            property: true,
        },
    });
};
exports.findAllRoomsRepository = findAllRoomsRepository;
const getRoomByPropertyAndNameRepository = async (propertyname, roomname, checkIn, checkOut) => {
    return await prisma_1.prisma.rooms.findMany({
        where: {
            AND: [
                propertyname
                    ? {
                        property: {
                            name: {
                                contains: String(propertyname),
                                mode: "insensitive",
                            },
                        },
                    }
                    : {},
                roomname
                    ? {
                        name: {
                            contains: String(roomname),
                            mode: "insensitive",
                        },
                    }
                    : {},
                checkIn && checkOut
                    ? {
                        room_availability: {
                            some: {
                                date: {
                                    gte: new Date(checkIn),
                                    lt: new Date(checkOut),
                                },
                                is_available: true,
                            },
                        },
                    }
                    : {},
            ],
        },
        include: {
            property: true,
            room_images: true,
            room_availability: checkIn && checkOut
                ? {
                    where: {
                        date: {
                            gte: new Date(checkIn),
                            lt: new Date(checkOut),
                        },
                        is_available: true,
                    },
                    orderBy: { date: "asc" },
                }
                : false,
            peak_season_rates: checkIn && checkOut
                ? {
                    where: {
                        start_date: { lte: new Date(checkOut) },
                        end_date: { gte: new Date(checkIn) },
                    },
                }
                : true,
        },
    });
};
exports.getRoomByPropertyAndNameRepository = getRoomByPropertyAndNameRepository;
const getRoomByPropertyAndNameRepositoryDetail = async (propertyname, roomname) => {
    return await prisma_1.prisma.rooms.findMany({
        where: {
            AND: [
                propertyname
                    ? {
                        property: {
                            name: {
                                contains: String(propertyname),
                                mode: "insensitive",
                            },
                        },
                    }
                    : {},
                roomname
                    ? {
                        name: {
                            contains: String(roomname),
                            mode: "insensitive",
                        },
                    }
                    : {},
            ],
        },
        include: {
            property: {
                include: {
                    property_images: true,
                    reviews: {
                        select: {
                            id: true,
                            rating: true,
                            comment: true,
                        },
                    },
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                    bookings: {
                        include: {
                            booking_rooms: {
                                include: {
                                    room: {
                                        select: {
                                            id: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            room_images: true,
        },
    });
};
exports.getRoomByPropertyAndNameRepositoryDetail = getRoomByPropertyAndNameRepositoryDetail;
const findRoomByIdRepository = async (id) => {
    return await prisma_1.prisma.rooms.findUnique({
        where: { id, deleted_at: null },
    });
};
exports.findRoomByIdRepository = findRoomByIdRepository;
const findByRoomIdRepository = async (roomId) => {
    return prisma_1.prisma.room_availability.findMany({
        where: { room_id: roomId },
        orderBy: { date: "asc" },
    });
};
exports.findByRoomIdRepository = findByRoomIdRepository;
const findByRoomIdAndDateRangeRepository = async (roomId, startDate, endDate) => {
    const room = await prisma_1.prisma.rooms.findUnique({
        where: { id: roomId },
        select: {
            id: true,
            name: true,
            total_rooms: true,
            capacity: true,
        },
    });
    if (!room) {
        throw new AppError_1.default("Room not found", 404);
    }
    const availability = await prisma_1.prisma.room_availability.findMany({
        where: {
            room_id: roomId,
            date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: "asc" },
    });
    const bookings = await prisma_1.prisma.booking_rooms.findMany({
        where: {
            room_id: roomId,
            booking: {
                check_in_date: { lte: endDate },
                check_out_date: { gte: startDate },
            },
        },
        select: {
            quantity: true,
            booking: {
                select: {
                    check_in_date: true,
                    check_out_date: true,
                },
            },
        },
    });
    const results = availability.map((a) => {
        const bookedCount = bookings
            .filter((b) => b.booking.check_in_date <= a.date && b.booking.check_out_date > a.date)
            .reduce((sum, b) => sum + b.quantity, 0);
        const remaining = a.is_available ? room.total_rooms - bookedCount : 0;
        return {
            id: a.id,
            date: a.date,
            is_available: a.is_available,
            total_rooms: room.total_rooms,
            booked_count: bookedCount,
            remaining: remaining < 0 ? 0 : remaining,
        };
    });
    return results;
};
exports.findByRoomIdAndDateRangeRepository = findByRoomIdAndDateRangeRepository;
const blockAllRoomsByTenantRepository = async (roomId, startDate, endDate) => {
    const room = await prisma_1.prisma.rooms.findUnique({
        where: { id: roomId },
        select: { id: true },
    });
    if (!room) {
        throw new AppError_1.default("Room not found", 404);
    }
    // ambil semua availability yang kena block
    const availability = await prisma_1.prisma.room_availability.findMany({
        where: {
            room_id: roomId,
            date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: "asc" },
        select: { id: true, date: true },
    });
    if (availability.length === 0) {
        throw new AppError_1.default("No availability found in the given date range", 404);
    }
    // update semuanya jadi false
    await prisma_1.prisma.room_availability.updateMany({
        where: { id: { in: availability.map((a) => a.id) } },
        data: { is_available: false },
    });
    return {
        message: "All rooms blocked successfully",
        blocked_dates: availability.map((a) => a.date.toISOString().split("T")[0]),
    };
};
exports.blockAllRoomsByTenantRepository = blockAllRoomsByTenantRepository;
const unBlockAllRoomsByTenantRepository = async (roomId, startDate, endDate) => {
    const room = await prisma_1.prisma.rooms.findUnique({
        where: { id: roomId },
        select: { id: true },
    });
    if (!room) {
        throw new AppError_1.default("Room not found", 404);
    }
    const availability = await prisma_1.prisma.room_availability.findMany({
        where: {
            room_id: roomId,
            date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: "asc" },
        select: { id: true, date: true },
    });
    if (availability.length === 0) {
        throw new AppError_1.default("No availability found in the given date range", 404);
    }
    await prisma_1.prisma.room_availability.updateMany({
        where: { id: { in: availability.map((a) => a.id) } },
        data: { is_available: true },
    });
    return {
        message: "All rooms blocked successfully",
        blocked_dates: availability.map((a) => a.date.toISOString().split("T")[0]),
    };
};
exports.unBlockAllRoomsByTenantRepository = unBlockAllRoomsByTenantRepository;
const deleteRoomByIdRepository = async (id) => {
    const result = await prisma_1.prisma.rooms.updateMany({
        where: {
            id: id,
            deleted_at: null,
        },
        data: {
            deleted_at: new Date(),
        },
    });
    if (result.count === 0) {
        throw new AppError_1.default("Property not found or already deleted", 404);
    }
    return true;
};
exports.deleteRoomByIdRepository = deleteRoomByIdRepository;
const updateRoomByIdRepository = async (id, data) => {
    const updateData = {
        ...(data.property_id && {
            property: {
                connect: { id: data.property_id },
            },
        }),
        name: data.name,
        description: data.description,
        base_price: data.base_price,
        capacity: data.capacity,
        total_rooms: data.total_rooms,
        image: data.image,
        ...(data.room_images && {
            room_images: {
                deleteMany: {},
                create: data.room_images.map((img) => ({ image_url: img.image_url })),
            },
        }),
    };
    return await prisma_1.prisma.rooms.update({
        where: { id, deleted_at: null },
        data: updateData,
    });
};
exports.updateRoomByIdRepository = updateRoomByIdRepository;
const getRoomByIdRepository = async (id) => {
    return await prisma_1.prisma.rooms.findUnique({
        where: { id, deleted_at: null },
        select: {
            name: true,
            description: true,
            capacity: true,
            image: true,
            total_rooms: true,
            room_images: true,
            base_price: true,
            property_id: true,
        },
    });
};
exports.getRoomByIdRepository = getRoomByIdRepository;
//# sourceMappingURL=rooms.repository.js.map