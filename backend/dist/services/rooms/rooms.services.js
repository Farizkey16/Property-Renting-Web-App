"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomByIdService = exports.getRoomByPropertyAndNameServiceDetail = exports.getRoomByPropertyAndNameService = exports.getRoomAvailableService = exports.getRoomsService = exports.updateRoomService = exports.createRoomService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const cloudinary_1 = require("../../config/cloudinary");
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const rooms_repository_1 = require("../../repositories/rooms/rooms.repository");
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const createRoomService = async (data, files, weekend_peak, custom_peaks = []) => {
    const { property_id, name, description, base_price, capacity, total_rooms } = data;
    const existingRoom = await (0, rooms_repository_1.findRoomRepository)(property_id);
    if (!existingRoom)
        throw new AppError_1.default("Room not found", 404);
    // handle image
    let uploadedImages = [];
    if (files && files.length > 0) {
        uploadedImages = await Promise.all(files.map(async (file) => {
            const result = await (0, cloudinary_1.handleUpload)(file);
            return result.secure_url;
        }));
    }
    const parsedCapacity = Number(capacity);
    const parsedTotalRoom = Number(total_rooms);
    if (isNaN(parsedCapacity) || isNaN(parsedTotalRoom)) {
        throw new AppError_1.default("Invalid capacity", 400);
    }
    // create room
    const newRoom = await (0, rooms_repository_1.createRoomRepository)({
        property_id,
        name,
        description,
        base_price,
        capacity: parsedCapacity,
        image: uploadedImages[0] || "",
        total_rooms: parsedTotalRoom,
        room_images: uploadedImages.map((url) => ({ image_url: url })),
    });
    await (0, rooms_repository_1.createRoomAvailability)(newRoom.id);
    if (weekend_peak || custom_peaks.length > 0) {
        const peakRatesData = [];
        for (const peak of custom_peaks) {
            peakRatesData.push({
                property_id,
                room_id: newRoom.id,
                start_date: new Date(peak.start_date),
                end_date: new Date(peak.end_date),
                price_change_type: peak.type,
                price_change_value: peak.value,
            });
        }
        if (weekend_peak) {
            const today = (0, dayjs_1.default)().tz("Asia/Jakarta").startOf("day");
            const endDate = today.add(6, "month");
            for (let date = today; date.isBefore(endDate); date = date.add(1, "day")) {
                const day = date.day();
                if (day === 0 || day === 6) {
                    peakRatesData.push({
                        property_id,
                        room_id: newRoom.id,
                        start_date: date.toDate(),
                        end_date: date.toDate(),
                        price_change_type: weekend_peak.type,
                        price_change_value: weekend_peak.value,
                    });
                }
            }
        }
        if (peakRatesData.length > 0) {
            await prisma_1.prisma.peak_season_rates.createMany({
                data: peakRatesData,
                skipDuplicates: true,
            });
        }
    }
    const availabilityWithPrice = await (0, rooms_repository_1.getRoomDefaultAvailabilityWithPriceRepository)(newRoom.id, weekend_peak);
    const peakRates = await prisma_1.prisma.peak_season_rates.findMany({
        where: { room_id: newRoom.id },
    });
    return {
        ...newRoom,
        room_availability: availabilityWithPrice,
        peak_season_rates: peakRates,
    };
};
exports.createRoomService = createRoomService;
const updateRoomService = async (id, data, files, weekend_peak, custom_peaks) => {
    const { property_id, name, description, base_price, capacity, total_rooms } = data;
    const existingRoom = await (0, rooms_repository_1.getRoomByIdRepository)(id);
    if (!existingRoom)
        throw new AppError_1.default("Room not found", 404);
    let uploadedImages = [];
    if (files && files.length > 0) {
        uploadedImages = await Promise.all(files.map(async (file) => {
            const result = await (0, cloudinary_1.handleUpload)(file);
            return result.secure_url;
        }));
    }
    const parsedCapacity = Number(capacity);
    const parsedTotalRoom = Number(total_rooms);
    if (isNaN(parsedCapacity) || isNaN(parsedTotalRoom)) {
        throw new AppError_1.default("Invalid capacity", 400);
    }
    const updatedRoom = await (0, rooms_repository_1.updateRoomByIdRepository)(id, {
        property_id,
        name,
        description,
        base_price,
        capacity: parsedCapacity,
        total_rooms: parsedTotalRoom,
        ...(uploadedImages.length > 0 && { image: uploadedImages[0] }),
    });
    if (uploadedImages.length > 0) {
        await prisma_1.prisma.room_images.deleteMany({ where: { room_id: id } });
        await prisma_1.prisma.room_images.createMany({
            data: uploadedImages.map((url) => ({
                room_id: id,
                image_url: url,
            })),
        });
    }
    await prisma_1.prisma.peak_season_rates.deleteMany({
        where: { room_id: id },
    });
    if (weekend_peak) {
        const today = (0, dayjs_1.default)().tz("Asia/Jakarta").startOf("day");
        const endDate = today.add(6, "month");
        const weekendRates = [];
        for (let date = today; date.isBefore(endDate); date = date.add(1, "day")) {
            const day = date.day();
            if (day === 0 || day === 6) {
                weekendRates.push({
                    property_id,
                    room_id: id,
                    start_date: date.toDate(),
                    end_date: date.toDate(),
                    price_change_type: weekend_peak.type,
                    price_change_value: weekend_peak.value,
                });
            }
        }
        if (weekendRates.length > 0) {
            await prisma_1.prisma.peak_season_rates.createMany({
                data: weekendRates,
                skipDuplicates: true,
            });
        }
    }
    if (custom_peaks && custom_peaks.length > 0) {
        const customRates = custom_peaks.map((peak) => ({
            property_id,
            room_id: id,
            start_date: peak.start_date,
            end_date: peak.end_date,
            price_change_type: peak.type,
            price_change_value: peak.value,
        }));
        await prisma_1.prisma.peak_season_rates.createMany({
            data: customRates,
            skipDuplicates: true,
        });
    }
    const availabilityWithPrice = await (0, rooms_repository_1.getRoomDefaultAvailabilityWithPriceRepository)(id, weekend_peak);
    const peakSeasonRates = await prisma_1.prisma.peak_season_rates.findMany({
        where: { room_id: id },
        orderBy: { start_date: "asc" },
    });
    return {
        ...updatedRoom,
        room_availability: availabilityWithPrice,
        peak_season_rates: peakSeasonRates,
    };
};
exports.updateRoomService = updateRoomService;
const getRoomsService = async () => {
    const response = await (0, rooms_repository_1.findAllRoomsRepository)();
    return response;
};
exports.getRoomsService = getRoomsService;
const getRoomAvailableService = async (roomId, startDate, endDate) => {
    if (startDate && endDate) {
        return await (0, rooms_repository_1.findByRoomIdAndDateRangeRepository)(roomId, new Date(startDate), new Date(endDate));
    }
    return await (0, rooms_repository_1.findByRoomIdRepository)(roomId);
};
exports.getRoomAvailableService = getRoomAvailableService;
const getRoomByPropertyAndNameService = async (propertyname, roomname, checkIn, checkOut) => {
    const rooms = await (0, rooms_repository_1.getRoomByPropertyAndNameRepository)(propertyname, roomname);
    if (!rooms || rooms.length === 0) {
        throw new AppError_1.default("Room not found", 404);
    }
    const room = rooms[0];
    if (!room) {
        throw new AppError_1.default("[getRoomAvailableService]: room is missing.", 400);
    }
    if (checkIn && checkOut) {
        const pricing = await (0, rooms_repository_1.getRoomAvailabilityWithPriceRepository)(room.id, checkIn, checkOut);
        return [
            {
                ...room,
                pricing,
            },
        ];
    }
    return room;
};
exports.getRoomByPropertyAndNameService = getRoomByPropertyAndNameService;
const getRoomByPropertyAndNameServiceDetail = async (propertyname, roomname) => {
    const rooms = await (0, rooms_repository_1.getRoomByPropertyAndNameRepositoryDetail)(propertyname, roomname);
    if (!rooms || rooms.length === 0) {
        throw new AppError_1.default("Room not found", 404);
    }
    const room = rooms[0];
    return room;
};
exports.getRoomByPropertyAndNameServiceDetail = getRoomByPropertyAndNameServiceDetail;
const deleteRoomByIdService = async (id) => {
    const existingRoom = await (0, rooms_repository_1.findRoomByIdRepository)(id);
    if (!existingRoom) {
        throw new AppError_1.default("Room not found", 404);
    }
    const response = await (0, rooms_repository_1.deleteRoomByIdRepository)(id);
    return response;
};
exports.deleteRoomByIdService = deleteRoomByIdService;
//# sourceMappingURL=rooms.services.js.map