import { PropertyCategory } from "../../../prisma/generated/client";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import {
  PropertyTypes,
  UpdatePropertyInput,
} from "../../types/property/property.types";
import { parsePropertyCategory } from "../../utils/propertyCategory";

export const getAllPropertiesRepository = async (filters: {
  property_category?: string;
  name?: string;
}) => {
  const { property_category, name } = filters;

  return prisma.properties.findMany({
    where: {
      property_category: property_category
        ? (property_category as PropertyCategory)
        : undefined,
      name: name ? { contains: name, mode: "insensitive" } : undefined,
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
        select: {
          id: true,
          name: true,
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
  checkIn: string,
  checkOut: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  guests?: number,
  rooms?: number
) => {
  const query = `
    WITH dates AS (
      SELECT generate_series($1::date, $2::date - interval '1 day', interval '1 day') AS date
    ),
    available_rooms AS (
      SELECT 
        r.id,
        r.property_id,
        r.name,
        r.description,
        r.base_price,
        r.capacity,
        r.image,
        r.total_rooms,
        COUNT(ra.date) FILTER (WHERE ra.is_available = true) AS available_days,
        COUNT(d.date) AS total_days
      FROM rooms r
      CROSS JOIN dates d
      LEFT JOIN room_availability ra 
        ON ra.room_id = r.id AND ra.date = d.date
      WHERE
        (${minPrice ? `r.base_price >= ${minPrice}` : "TRUE"})
        AND (${maxPrice ? `r.base_price <= ${maxPrice}` : "TRUE"})
        AND (${guests ? `r.capacity >= ${guests}` : "TRUE"})
        AND (${rooms ? `r.total_rooms >= ${rooms}` : "TRUE"})
      GROUP BY r.id
      HAVING COUNT(ra.date) FILTER (WHERE ra.is_available = true) = COUNT(d.date)
    )
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
        cos(radians($3)) *
        cos(radians(p.latitude::double precision)) *
        cos(radians(p.longitude::double precision) - radians($4)) +
        sin(radians($3)) *
        sin(radians(p.latitude::double precision))
      )) AS distance,
      COALESCE(
        json_agg(
          json_build_object(
            'id', ar.id,
            'name', ar.name,
            'description', ar.description,
            'base_price', ar.base_price,
            'capacity', ar.capacity,
            'image', ar.image,
            'total_rooms', ar.total_rooms
          )
        ) FILTER (WHERE ar.id IS NOT NULL),
        '[]'
      ) AS rooms
    FROM properties p
    LEFT JOIN available_rooms ar ON ar.property_id = p.id
    ${category ? `WHERE p.property_category = '${category}'` : ""}
    GROUP BY 
      p.id, p.name, p.description, p.address, p.city, 
      p.province, p.zip_code, p.latitude, p.longitude, 
      p.main_image, p.property_category
    HAVING (6371 * acos(
      cos(radians($3)) *
      cos(radians(p.latitude::double precision)) *
      cos(radians(p.longitude::double precision) - radians($4)) +
      sin(radians($3)) *
      sin(radians(p.latitude::double precision))
    )) <= $5
    ORDER BY distance ASC;
  `;

  return await prisma.$queryRawUnsafe<any[]>(
    query,
    checkIn,
    checkOut,
    lat,
    lng,
    radius
  );
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
