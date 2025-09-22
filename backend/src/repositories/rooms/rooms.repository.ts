import { prisma } from "../../config/prisma";
import { RoomsType } from "../../types/rooms/rooms.types";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "../../utils/dayjs";
import { Prisma } from "../../../prisma/generated/client";
import AppError from "../../errors/AppError";

const LOCAL_TZ = "Asia/Jakarta";

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
  let today = dayjs().tz(LOCAL_TZ).startOf("day");
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

export const getRoomDefaultAvailabilityWithPriceRepository = async (
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
    const day = dayjs(item.date).tz(LOCAL_TZ).day();
    let price = base_price;

    if (day === 0 || day === 6) {
      if (weekend_peak) {
        price =
          weekend_peak.type === "percentage"
            ? base_price.plus(base_price.mul(weekend_peak.value).div(100))
            : base_price.plus(new Decimal(weekend_peak.value));
      }
    }

    return {
      ...item,
      price: price.toNumber(),
    };
  });

  return availabilityWithPrice;
};

export const getRoomAvailabilityWithPriceRepository = async (
  room_id: string,
  checkIn: string,
  checkOut: string,
  weekend_peak?: { type: "percentage" | "nominal"; value: number }
) => {
  const startDate = dayjs(checkIn).tz(LOCAL_TZ).startOf("day").toDate();
  const endDate = dayjs(checkOut).tz(LOCAL_TZ).startOf("day").toDate();

  const room = await prisma.rooms.findUnique({
    where: { id: room_id, deleted_at: null },
    include: { peak_season_rates: true },
  });

  if (!room) return [];

  const availabilities = await prisma.room_availability.findMany({
    where: {
      room_id,
      date: { gte: startDate, lt: endDate },
    },
    orderBy: { date: "asc" },
  });

  const base_price = new Decimal(room.base_price);
  let total = new Decimal(0);

  const availabilityWithPrice = availabilities.map((item) => {
    const day = dayjs(item.date).tz(LOCAL_TZ).day();
    let price = base_price;

    const peak = room.peak_season_rates.find(
      (rate) =>
        dayjs(item.date).tz(LOCAL_TZ).isSameOrAfter(rate.start_date, "day") &&
        dayjs(item.date).tz(LOCAL_TZ).isSameOrBefore(rate.end_date, "day")
    );

    if (peak) {
      price =
        peak.price_change_type === "percentage"
          ? base_price.plus(base_price.mul(peak.price_change_value).div(100))
          : base_price.plus(new Decimal(peak.price_change_value));
    } else if ((day === 0 || day === 6) && weekend_peak) {
      price =
        weekend_peak.type === "percentage"
          ? base_price.plus(base_price.mul(weekend_peak.value).div(100))
          : base_price.plus(new Decimal(weekend_peak.value));
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

export const findRoomRepository = async (property_id: string) => {
  return await prisma.rooms.findMany({
    where: { property_id, deleted_at: null },
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
  roomname: string,
  checkIn?: string,
  checkOut?: string
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
      room_availability:
        checkIn && checkOut
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
      peak_season_rates:
        checkIn && checkOut
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

export const getRoomByPropertyAndNameRepositoryDetail = async (
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
      property: {
        include: {
          property_images: true,
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          },
        },
      },
      room_images: true,
    },
  });
};

export const findRoomByIdRepository = async (id: string) => {
  return await prisma.rooms.findUnique({
    where: { id, deleted_at: null },
  });
};

export const deleteRoomByIdRepository = async (id: string) => {
  const result = await prisma.rooms.updateMany({
    where: {
      id: id,
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  if (result.count === 0) {
    throw new AppError("Property not found or already deleted", 404);
  }

  return true;
};

export const updateRoomByIdRepository = async (
  id: string,
  data: Partial<RoomsType>
) => {
  const updateData: Prisma.roomsUpdateInput = {
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

  return await prisma.rooms.update({
    where: { id, deleted_at: null },
    data: updateData,
  });
};

export const getRoomByIdRepository = async (id: string) => {
  return await prisma.rooms.findUnique({
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
