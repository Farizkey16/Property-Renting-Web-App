import dayjs from "dayjs";
import { handleUpload } from "../../config/cloudinary";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import {
  createRoomAvailability,
  createRoomRepository,
  deleteRoomByIdRepository,
  findAllRoomsRepository,
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
  weekend_peak?: { type: "percentage" | "nominal"; value: number }
) => {
  const { property_id, name, description, base_price, capacity, total_rooms } =
    data;

  // cek property / room
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

  // create availability 6 bulan ke depan
  await createRoomAvailability(newRoom.id);

  // insert peak season rates kalau ada weekend_peak
  if (weekend_peak) {
    console.log("at controller: Weekend Peak consists of:", weekend_peak.type, weekend_peak.value)
    const today = dayjs().tz("Asia/Jakarta").startOf("day"); // pakai timezone lokal
    const endDate = today.add(6, "month");
    const peakRatesData: any[] = [];

    for (let date = today; date.isBefore(endDate); date = date.add(1, "day")) {
      const day = date.day(); // 0 = Sunday, 6 = Saturday
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

    if (peakRatesData.length > 0) {
      await prisma.peak_season_rates.createMany({
        data: peakRatesData,
        skipDuplicates: true,
      });
    }
  }

  // ambil availability + harga akhir
  const availabilityWithPrice =
    await getRoomDefaultAvailabilityWithPriceRepository(
      newRoom.id,
      weekend_peak
    );

  return {
    ...newRoom,
    room_availability: availabilityWithPrice,
  };
};

export const updateRoomService = async (
  id: string,
  data: RoomsType,
  files: Express.Multer.File[],
  weekend_peak?: { type: "percentage" | "nominal"; value: number }
) => {
  const { property_id, name, description, base_price, capacity, total_rooms } =
    data;

  // cek room dulu
  const existingRoom = await getRoomByIdRepository(id);
  if (!existingRoom) throw new AppError("Room not found", 404);

  // handle image upload
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

  // update room
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

  // handle peak season rates
  if (weekend_peak) {
    const today = dayjs().tz("Asia/Jakarta").startOf("day");
    const endDate = today.add(6, "month");

    // hapus dulu peak season lama untuk room ini
    await prisma.peak_season_rates.deleteMany({
      where: { room_id: id },
    });

    const peakRatesData: any[] = [];
    for (let date = today; date.isBefore(endDate); date = date.add(1, "day")) {
      const day = date.day();
      if (day === 0 || day === 6) {
        peakRatesData.push({
          property_id,
          room_id: id,
          start_date: date.toDate(),
          end_date: date.toDate(),
          price_change_type: weekend_peak.type,
          price_change_value: weekend_peak.value,
        });
      }
    }

    if (peakRatesData.length > 0) {
      await prisma.peak_season_rates.createMany({
        data: peakRatesData,
        skipDuplicates: true,
      });
    }
  }

  // ambil availability + harga akhir
  const availabilityWithPrice =
    await getRoomDefaultAvailabilityWithPriceRepository(id, weekend_peak);

  return {
    ...updatedRoom,
    room_availability: availabilityWithPrice,
  };
};

export const getRoomsService = async () => {
  const response = await findAllRoomsRepository();
  return response;
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
