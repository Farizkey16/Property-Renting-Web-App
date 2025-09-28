"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_service_1 = require("../../services/property/property.service");
const tenant_repository_1 = require("../../repositories/tenant/tenant.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const client_1 = require("../../../prisma/generated/client");
const property_repository_1 = require("../../repositories/property/property.repository");
class PropertyController {
    async getAllProperties(req, res, next) {
        const { property_category, name, page = "1", limit = "8" } = req.query;
        try {
            if (property_category &&
                !Object.values(client_1.PropertyCategory).includes(property_category)) {
                throw new AppError_1.default("Invalid property category", 400);
            }
            const { data, total } = await (0, property_service_1.getAllPropertiesService)({
                property_category: property_category,
                name: name,
                page: Number(page),
                limit: Number(limit),
            });
            res.status(200).send({
                message: "Properties found",
                success: true,
                properties: data,
                total,
                page: Number(page),
                limit: Number(limit),
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPropertyById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new AppError_1.default("[getPropertyById]: Id is required.", 400);
            }
            const property = await (0, property_service_1.getPropertyByIdService)(id);
            res
                .status(200)
                .send({ message: "Property found", success: true, property });
        }
        catch (error) {
            next(error);
        }
    }
    async getPropertiesByTenantId(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const tenantWithProperties = await (0, property_repository_1.getTenantWithPropertiesByUserId)(decrypt.userId);
            if (!tenantWithProperties) {
                throw new AppError_1.default("Tenant not found", 404);
            }
            res.status(200).json({
                success: true,
                message: "Properties found",
                tenant: {
                    id: tenantWithProperties.id,
                    logo: tenantWithProperties.logo,
                    company_name: tenantWithProperties.company_name,
                },
                properties: tenantWithProperties.properties,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPropertyByLocation(req, res, next) {
        try {
            const { latitude, longitude, radius, checkIn, checkOut, guests, rooms, category, minPrice, maxPrice, } = req.query;
            if (!latitude || !longitude || !radius) {
                throw new AppError_1.default("latitude, longitude, and radius are required", 400);
            }
            if (!checkIn || !checkOut) {
                throw new AppError_1.default("checkIn and checkOut are required", 400);
            }
            const rad = Number(radius) || 5;
            const lat = Number(latitude);
            const lng = Number(longitude);
            const properties = await (0, property_service_1.getPropertyByLocationServices)(lat, lng, rad, checkIn, checkOut, category, minPrice ? Number(minPrice) : undefined, maxPrice ? Number(maxPrice) : undefined, guests ? Number(guests) : undefined, rooms ? Number(rooms) : undefined);
            res.status(200).send({
                message: "Properties found",
                success: true,
                radius: rad,
                user_location: { latitude: lat, longitude: lng },
                filters: {
                    checkIn,
                    checkOut,
                    guests: guests ? Number(guests) : undefined,
                    rooms: rooms ? Number(rooms) : undefined,
                    category,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                },
                properties,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createProperty(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("tenant not found", 404);
            }
            const property = await (0, property_service_1.createPropertyServices)(req.body, req.file, tenant.id);
            res
                .status(201)
                .send({ message: "Property created", success: true, property });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProperty(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("tenant not found", 404);
            }
            const propertyId = req.params.id;
            if (!propertyId) {
                throw new AppError_1.default("[getPropertyById]: Id is required.", 400);
            }
            const property = await (0, property_service_1.updatePropertyServices)(propertyId, req.body, req.file, tenant.id);
            res
                .status(200)
                .send({ message: "Property updated", success: true, property });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProperty(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("Tenant not found", 404);
            }
            const propertyId = req.params.id;
            if (!propertyId) {
                throw new AppError_1.default("[deleteProperty]: Id is required.", 400);
            }
            await (0, property_service_1.deletePropertyService)(propertyId, tenant.id);
            res
                .status(200)
                .send({ message: "Property deleted (soft delete)", success: true });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = PropertyController;
//# sourceMappingURL=property.controller.js.map