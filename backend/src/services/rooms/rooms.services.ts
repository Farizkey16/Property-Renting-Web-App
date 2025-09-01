import { handleUpload } from "../../config/cloudinary";
import AppError from "../../errors/AppError";
import {
<<<<<<< HEAD
  createRoomAvailability,
=======
>>>>>>> main
  createRoomRepository,
  deleteRoomByIdRepository,
  findAllRoomsRepository,
  findRoomByIdRepository,
  findRoomRepository,
<<<<<<< HEAD
  getRoomAvailabilityWithPriceRepository,
  getRoomByPropertyAndNameRepository,
=======
>>>>>>> main
} from "../../repositories/rooms/rooms.repository";
import { RoomsType } from "../../types/rooms/rooms.types";

export const createRoomService = async (
  data: RoomsType,
<<<<<<< HEAD
  files: Express.Multer.File[],
  weekend_peak?: { type: "percentage" | "nominal"; value: number }
) => {
  const { property_id, name, description, base_price, capacity, total_rooms } =
    data;
  // pengecekan room
=======
  property_id: string,
  file: Express.Multer.File
) => {
  const { name, description, base_price, capacity, total_rooms } = data;
>>>>>>> main
  const existingRoom = await findRoomRepository(property_id);
  if (!existingRoom) {
    throw new AppError("Room not found", 404);
  }
<<<<<<< HEAD
  // handle image
  let uploadedImages: string[] = [];
  if (files && files.length > 0) {
    uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await handleUpload(file);
        return result.secure_url;
      })
    );
=======
  let uploadImage = null;
  if (file) {
    uploadImage = await handleUpload(file);
>>>>>>> main
  }

  const parsedCapacity = Number(capacity);
  const parsedTotalRoom = Number(total_rooms);
  if (isNaN(parsedCapacity) || isNaN(parsedTotalRoom)) {
    throw new AppError("Invalid capacity", 400);
  }

  const newRoom = await createRoomRepository({
    property_id,
    name,
    description,
    base_price,
    capacity: parsedCapacity,
<<<<<<< HEAD
    image: uploadedImages[0] || "",
    total_rooms: parsedTotalRoom,
    room_images: uploadedImages.map((url) => ({ image_url: url })),
  });

  await createRoomAvailability(newRoom.id);
  // jika tenant ingin merubah harga per weekend

  const availabilityWithPrice = await getRoomAvailabilityWithPriceRepository(
    newRoom.id,
    weekend_peak
  );
  return {
    ...newRoom,
    room_availability: availabilityWithPrice,
  };
=======
    image: uploadImage?.secure_url || "",
    total_rooms: parsedTotalRoom,
  });
  return newRoom;
>>>>>>> main
};

export const getRoomsService = async () => {
  const response = await findAllRoomsRepository();
  return response;
};

<<<<<<< HEAD
export const getRoomByPropertyAndNameService = async (
  propertyname: string,
  roomname: string
) => {
  const room = await getRoomByPropertyAndNameRepository(propertyname, roomname);
  if (room.length === 0) {
    throw new AppError("Room not found", 404);
  }
  return room;
=======
export const getRoomByIdService = async (id: string) => {
  const existingRoom = await findRoomByIdRepository(id);
  if (!existingRoom) {
    throw new AppError("Room not found", 404);
  }
  const response = await findAllRoomsRepository();
  return response;
>>>>>>> main
};

export const deleteRoomByIdService = async (id: string) => {
  const existingRoom = await findRoomByIdRepository(id);
  if (!existingRoom) {
    throw new AppError("Room not found", 404);
  }
  const response = await deleteRoomByIdRepository(id);
  return response;
};
