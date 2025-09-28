"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePropertyRepository = exports.updatePropertyRepository = exports.findNearbyPropertiesRepository = exports.createPropertyRepository = exports.findPropertyByIdRepository = exports.getTenantWithPropertiesByUserId = exports.getPropertyByIdRepository = exports.getAllPropertiesRepository = void 0;
const client_1 = require("../../../prisma/generated/client");
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const getAllPropertiesRepository = async ({ property_category, name, page, limit, }) => {
    const skip = (page - 1) * limit;
    const propertyWhere = {
        property_category: property_category
            ? property_category
            : undefined,
        name: name
            ? { contains: name, mode: client_1.Prisma.QueryMode.insensitive }
            : undefined,
        deleted_at: null,
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.rooms.findMany({
            skip,
            take: limit,
            orderBy: { created_at: "desc" },
            include: {
                property: true,
            },
            where: {
                property: propertyWhere,
            },
        }),
        prisma_1.prisma.rooms.count({
            where: {
                property: propertyWhere,
            },
        }),
    ]);
    return { data, total };
};
exports.getAllPropertiesRepository = getAllPropertiesRepository;
const getPropertyByIdRepository = async (propertyId) => {
    return prisma_1.prisma.properties.findUnique({
        where: { id: propertyId, deleted_at: null },
        include: {
            rooms: {
                where: { deleted_at: null },
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
exports.getPropertyByIdRepository = getPropertyByIdRepository;
const getTenantWithPropertiesByUserId = async (userId) => {
    return prisma_1.prisma.tenants.findUnique({
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
                        where: { deleted_at: null },
                        include: {
                            room_images: true,
                            room_availability: {
                                where: { is_available: false },
                                select: {
                                    id: true,
                                    date: true,
                                    is_available: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
exports.getTenantWithPropertiesByUserId = getTenantWithPropertiesByUserId;
const findPropertyByIdRepository = async (id) => {
    return prisma_1.prisma.properties.findUnique({
        where: { id, deleted_at: null },
    });
};
exports.findPropertyByIdRepository = findPropertyByIdRepository;
const createPropertyRepository = async (data) => {
    return prisma_1.prisma.properties.create({
        data,
    });
};
exports.createPropertyRepository = createPropertyRepository;
const findNearbyPropertiesRepository = async (lat, lng, radius, checkIn, checkOut, category, minPrice, maxPrice, guests, rooms) => {
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
      WHERE r.deleted_at IS NULL
        AND ($6::int IS NULL OR r.base_price >= $6)
        AND ($7::int IS NULL OR r.base_price <= $7)
        AND ($8::int IS NULL OR r.capacity >= $8)
        AND ($9::int IS NULL OR r.total_rooms >= $9)
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
    WHERE p.deleted_at IS NULL
      AND ($10::text IS NULL OR p.property_category = $10::"PropertyCategory")
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
    return await prisma_1.prisma.$queryRawUnsafe(query, checkIn, checkOut, lat, lng, radius, minPrice ?? null, maxPrice ?? null, guests ?? null, rooms ?? null, category ?? null);
};
exports.findNearbyPropertiesRepository = findNearbyPropertiesRepository;
const updatePropertyRepository = async (data) => {
    const { propertyId, tenant_id, ...updateData } = data;
    const result = await prisma_1.prisma.properties.updateMany({
        where: {
            id: propertyId,
            tenant_id: tenant_id,
            deleted_at: null,
        },
        data: updateData,
    });
    if (result.count === 0) {
        throw new AppError_1.default("Property not found or not owned by tenant", 404);
    }
    const updatedProperty = await prisma_1.prisma.properties.findUnique({
        where: { id: propertyId },
    });
    return updatedProperty;
};
exports.updatePropertyRepository = updatePropertyRepository;
const softDeletePropertyRepository = async (propertyId, tenant_id) => {
    const result = await prisma_1.prisma.properties.updateMany({
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
        throw new AppError_1.default("Property not found or already deleted", 404);
    }
    return true;
};
exports.softDeletePropertyRepository = softDeletePropertyRepository;
//# sourceMappingURL=property.repository.js.map