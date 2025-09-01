import dayjs from "dayjs";
import { prisma } from "../../config/prisma";
import { RoomsType } from "../../types/rooms/rooms.types";
import { Decimal } from "@prisma/client/runtime/library";

export const createRoomRepository = async (data: RoomsType) => {
  return await prisma.rooms.create({
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

export const createRoomAvailability = async (room_id: string, months = 6) => {
  const today = dayjs();
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

  return await prisma.room_availability.createMany({
    data: availabilityData,
    skipDuplicates: true,
  });
};

export const getRoomAvailabilityWithPriceRepository = async (
  room_id: string,
  weekend_peak?: { type: "percentage" | "nominal"; value: number }
) => {
  const room = await prisma.rooms.findUnique({
    where: { id: room_id },
    include: { room_availability: true },
  });

  if (!room) return [];

  const base_price = new Decimal(room.base_price);

  const availabilityWithPrice = room.room_availability.map((item) => {
    const day = dayjs(item.date).day(); // 0 = Sunday, 6 = Saturday
    let price = base_price;

    if (day === 0 || day === 6) {
      if (weekend_peak) {
        price =
          weekend_peak.type === "percentage"
            ? base_price.plus(base_price.mul(weekend_peak.value).div(100))
            : base_price.plus(new Decimal(weekend_peak.value));
      } else {
        price = base_price.mul(1.1); // default +10% weekend
      }
    }

    return {
      ...item,
      price: price.toNumber(), // ubah Decimal ke number supaya bisa dikirim ke frontend
    };
  });

  return availabilityWithPrice;
};

export const findRoomRepository = async (property_id: string) => {
  return await prisma.rooms.findMany({
    where: { property_id },
    include: {
      property: true,
    },
  });
};

export const findAllRoomsRepository = async () => {
  return await prisma.rooms.findMany({
    include: {
      property: true,
    },
  });
};

export const getRoomByPropertyAndNameRepository = async (
  propertyname: string,
  roomname: string
) => {
  return await prisma.rooms.findMany({
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
      property: true,
      room_images: true,
    },
  });
};

export const findRoomByIdRepository = async (id: string) => {
  return await prisma.rooms.findUnique({
    where: { id },
  });
};

export const deleteRoomByIdRepository = async (id: string) => {
  return await prisma.rooms.delete({
    where: { id },
  });
};
