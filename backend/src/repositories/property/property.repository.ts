import { PropertyCategory } from "../../../prisma/generated/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import {
  PropertyTypes,
  UpdatePropertyInput,
} from "../../types/property/property.types";

export const getAllPropertiesRepository = async (filters: {
  property_category?: string;
  min_price?: number;
  max_price?: number;
}) => {
  const { property_category, min_price, max_price } = filters;

  return prisma.properties.findMany({
    where: {
      property_category: property_category
        ? (property_category as PropertyCategory)
        : undefined,
      rooms: {
        some: {
          base_price: {
            gte: min_price || undefined,
            lte: max_price || undefined,
          },
        },
      },
      deleted_at: null,
    },
    orderBy: { created_at: "desc" },
    include: {
      rooms: true,
    },
  });
};

export const getPropertyByIdRepository = async (propertyId: string) => {
  return prisma.properties.findUnique({
    where: { id: propertyId, deleted_at: null },
    include: {
      property_images: true,
      reviews: true,
      rooms: {
        include: {
          room_images: true,
          room_availability: true,
        },
      },
    },
  });
};

export const getTenantWithPropertiesByUserId = async (userId: string) => {
  return prisma.tenants.findUnique({
    where: { user_id: userId },
    select: {
      id: true,
      logo: true,
      company_name: true,
      properties: {
        where: { deleted_at: null },
        orderBy: { created_at: "desc" },
        include: {
          rooms: {
            include: {
              room_images: true,
              room_availability: true,
            },
          },
        },
      },
    },
  });
};

export const findPropertyByIdRepository = async (id: string) => {
  return prisma.properties.findUnique({
    where: { id, deleted_at: null },
  });
};

export const createPropertyRepository = async (data: PropertyTypes) => {
  return prisma.properties.create({
    data,
  });
};

export const findNearbyPropertiesRepository = async (
  lat: number,
  lng: number,
  radius: number,
  checkIn?: string,
  checkOut?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  return await prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      p.id,
      p.name,
      p.description,
      p.address,
      p.city,
      p.province,
      p.zip_code,
      p.latitude,
      p.longitude,
      p.main_image,
      p.property_category,
      (6371 * acos(
        cos(radians(${lat})) *
        cos(radians(p.latitude::double precision)) *
        cos(radians(p.longitude::double precision) - radians(${lng})) +
        sin(radians(${lat})) *
        sin(radians(p.latitude::double precision))
      )) AS distance,
      COALESCE(
        json_agg(
          json_build_object(
            'id', r.id,
            'name', r.name,
            'description', r.description,
            'base_price', r.base_price,
            'capacity', r.capacity,
            'image', r.image,
            'total_rooms', r.total_rooms
          )
        ) FILTER (
          WHERE r.id IS NOT NULL
          ${
            checkIn && checkOut
              ? `AND NOT EXISTS (
                  SELECT 1
                  FROM room_availability ra
                  WHERE ra.room_id = r.id
                  AND ra.date BETWEEN '${checkIn}'::date AND '${checkOut}'::date
                  AND ra.is_available = false
                )`
              : ""
          }
          ${minPrice ? `AND r.base_price >= ${minPrice}` : ""}
          ${maxPrice ? `AND r.base_price <= ${maxPrice}` : ""}
        ),
        '[]'
      ) AS rooms
    FROM properties p
    LEFT JOIN rooms r ON r.property_id = p.id
    GROUP BY 
      p.id, p.name, p.description, p.address, p.city, 
      p.province, p.zip_code, p.latitude, p.longitude, 
      p.main_image, p.property_category
    HAVING (6371 * acos(
      cos(radians(${lat})) *
      cos(radians(p.latitude::double precision)) *
      cos(radians(p.longitude::double precision) - radians(${lng})) +
      sin(radians(${lat})) *
      sin(radians(p.latitude::double precision))
    )) <= ${radius}
    ${category ? `AND p.property_category = '${category}'` : ""}
    ORDER BY distance ASC;
  `);
};

export const updatePropertyRepository = async (data: UpdatePropertyInput) => {
  const { propertyId, tenant_id, ...updateData } = data;
  const result = await prisma.properties.updateMany({
    where: {
      id: propertyId,
      tenant_id: tenant_id,
      deleted_at: null,
    },
    data: updateData,
  });
  if (result.count === 0) {
    throw new AppError("Property not found or not owned by tenant", 404);
  }
  const updatedProperty = await prisma.properties.findUnique({
    where: { id: propertyId },
  });
  return updatedProperty;
};

export const softDeletePropertyRepository = async (
  propertyId: string,
  tenant_id: string
) => {
  const result = await prisma.properties.updateMany({
    where: {
      id: propertyId,
      tenant_id: tenant_id,
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
