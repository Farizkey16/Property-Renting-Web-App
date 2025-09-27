import dayjs from "dayjs";
import { handleUpload } from "../../config/cloudinary";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import {
  createRoomAvailability,
  createRoomRepository,
  deleteRoomByIdRepository,
  findAllRoomsRepository,
  findByRoomIdAndDateRangeRepository,
  findByRoomIdRepository,
  findRoomByIdRepository,
  findRoomRepository,
  getRoomAvailabilityWithPriceRepository,
  getRoomByIdRepository,
  getRoomByPropertyAndNameRepository,
  getRoomByPropertyAndNameRepositoryDetail,
  getRoomDefaultAvailabilityWithPriceRepository,
  updateRoomByIdRepository,
} from "../../repositories/rooms/rooms.repository";
import { RoomsType } from "../../types/rooms/rooms.types";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const createRoomService = async (
  data: RoomsType,
  files: Express.Multer.File[],
  weekend_peak?: { type: "percentage" | "nominal"; value: number },
  custom_peaks: {
    start_date: Date;
    end_date: Date;
    type: "percentage" | "nominal";
    value: number;
  }[] = []
) => {
  const { property_id, name, description, base_price, capacity, total_rooms } =
    data;

  const existingRoom = await findRoomRepository(property_id);
  if (!existingRoom) throw new AppError("Room not found", 404);

  // handle image
  let uploadedImages: string[] = [];
  if (files && files.length > 0) {
    uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await handleUpload(file);
        return result.secure_url;
      })
    );
  }

  const parsedCapacity = Number(capacity);
  const parsedTotalRoom = Number(total_rooms);
  if (isNaN(parsedCapacity) || isNaN(parsedTotalRoom)) {
    throw new AppError("Invalid capacity", 400);
  }

  // create room
  const newRoom = await createRoomRepository({
    property_id,
    name,
    description,
    base_price,
    capacity: parsedCapacity,
    image: uploadedImages[0] || "",
    total_rooms: parsedTotalRoom,
    room_images: uploadedImages.map((url) => ({ image_url: url })),
  });

  await createRoomAvailability(newRoom.id);

  if (weekend_peak || custom_peaks.length > 0) {
    const peakRatesData: any[] = [];

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
      const today = dayjs().tz("Asia/Jakarta").startOf("day");
      const endDate = today.add(6, "month");

      for (
        let date = today;
        date.isBefore(endDate);
        date = date.add(1, "day")
      ) {
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
      await prisma.peak_season_rates.createMany({
        data: peakRatesData,
        skipDuplicates: true,
      });
    }
  }

  const availabilityWithPrice =
    await getRoomDefaultAvailabilityWithPriceRepository(
      newRoom.id,
      weekend_peak
    );

  const peakRates = await prisma.peak_season_rates.findMany({
    where: { room_id: newRoom.id },
  });

  return {
    ...newRoom,
    room_availability: availabilityWithPrice,
    peak_season_rates: peakRates,
  };
};

export const updateRoomService = async (
  id: string,
  data: RoomsType,
  files: Express.Multer.File[],
  weekend_peak?: { type: "percentage" | "nominal"; value: number },
  custom_peaks?: {
    start_date: Date;
    end_date: Date;
    type: "percentage" | "nominal";
    value: number;
  }[]
) => {
  const { property_id, name, description, base_price, capacity, total_rooms } =
    data;

  const existingRoom = await getRoomByIdRepository(id);
  if (!existingRoom) throw new AppError("Room not found", 404);

  let uploadedImages: string[] = [];
  if (files && files.length > 0) {
    uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await handleUpload(file);
        return result.secure_url;
      })
    );
  }

  const parsedCapacity = Number(capacity);
  const parsedTotalRoom = Number(total_rooms);
  if (isNaN(parsedCapacity) || isNaN(parsedTotalRoom)) {
    throw new AppError("Invalid capacity", 400);
  }

  const updatedRoom = await updateRoomByIdRepository(id, {
    property_id,
    name,
    description,
    base_price,
    capacity: parsedCapacity,
    total_rooms: parsedTotalRoom,
    ...(uploadedImages.length > 0 && { image: uploadedImages[0] }),
  });

  if (uploadedImages.length > 0) {
    await prisma.room_images.deleteMany({ where: { room_id: id } });
    await prisma.room_images.createMany({
      data: uploadedImages.map((url) => ({
        room_id: id,
        image_url: url,
      })),
    });
  }

  await prisma.peak_season_rates.deleteMany({
    where: { room_id: id },
  });

  if (weekend_peak) {
    const today = dayjs().tz("Asia/Jakarta").startOf("day");
    const endDate = today.add(6, "month");

    const weekendRates: any[] = [];
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
      await prisma.peak_season_rates.createMany({
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

    await prisma.peak_season_rates.createMany({
      data: customRates,
      skipDuplicates: true,
    });
  }

  const availabilityWithPrice =
    await getRoomDefaultAvailabilityWithPriceRepository(id, weekend_peak);

  const peakSeasonRates = await prisma.peak_season_rates.findMany({
    where: { room_id: id },
    orderBy: { start_date: "asc" },
  });

  return {
    ...updatedRoom,
    room_availability: availabilityWithPrice,
    peak_season_rates: peakSeasonRates,
  };
};

export const getRoomsService = async () => {
  const response = await findAllRoomsRepository();
  return response;
};

export const getRoomAvailableService = async (
  roomId: string,
  startDate?: string,
  endDate?: string
) => {
  if (startDate && endDate) {
    return await findByRoomIdAndDateRangeRepository(
      roomId,
      new Date(startDate),
      new Date(endDate)
    );
  }

  return await findByRoomIdRepository(roomId);
};

export const getRoomByPropertyAndNameService = async (
  propertyname: string,
  roomname: string,
  checkIn?: string,
  checkOut?: string
) => {
  const rooms = await getRoomByPropertyAndNameRepository(
    propertyname,
    roomname
  );

  if (!rooms || rooms.length === 0) {
    throw new AppError("Room not found", 404);
  }

  const room = rooms[0];

  if (checkIn && checkOut) {
    const pricing = await getRoomAvailabilityWithPriceRepository(
      room.id,
      checkIn,
      checkOut
    );

    return [
      {
        ...room,
        pricing,
      },
    ];
  }

  return room;
};

export const getRoomByPropertyAndNameServiceDetail = async (
  propertyname: string,
  roomname: string
) => {
  const rooms = await getRoomByPropertyAndNameRepositoryDetail(
    propertyname,
    roomname
  );

  if (!rooms || rooms.length === 0) {
    throw new AppError("Room not found", 404);
  }
  const room = rooms[0];
  return room;
};

export const deleteRoomByIdService = async (id: string) => {
  const existingRoom = await findRoomByIdRepository(id);
  if (!existingRoom) {
    throw new AppError("Room not found", 404);
  }
  const response = await deleteRoomByIdRepository(id);
  return response;
};