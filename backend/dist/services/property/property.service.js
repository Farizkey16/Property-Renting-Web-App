"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyService = exports.updatePropertyServices = exports.getPropertyByLocationServices = exports.createPropertyServices = exports.getPropertyByIdService = exports.getAllPropertiesService = void 0;
const client_1 = require("../../../prisma/generated/client");
const cloudinary_1 = require("../../config/cloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const property_repository_1 = require("../../repositories/property/property.repository");
const getAllPropertiesService = async (params) => {
    return (0, property_repository_1.getAllPropertiesRepository)(params);
};
exports.getAllPropertiesService = getAllPropertiesService;
const getPropertyByIdService = async (id) => {
    const existingProperty = await (0, property_repository_1.findPropertyByIdRepository)(id);
    if (!existingProperty) {
        throw new AppError_1.default("Property not found", 404);
    }
    const response = await (0, property_repository_1.getPropertyByIdRepository)(id);
    return response;
};
exports.getPropertyByIdService = getPropertyByIdService;
const createPropertyServices = async (data, file, tenant_id) => {
    const { name, description, address, city, province, zip_code, latitude, longitude, property_category, } = data;
    let uploadImage = null;
    if (file) {
        uploadImage = await (0, cloudinary_1.handleUpload)(file);
    }
    const normalizedCategory = property_category.toLowerCase();
    const isValidCategory = Object.values(client_1.PropertyCategory).includes(normalizedCategory);
    if (!isValidCategory) {
        throw new AppError_1.default("Invalid property category", 400);
    }
    const newProperty = await (0, property_repository_1.createPropertyRepository)({
        tenant_id,
        name,
        description,
        address,
        city,
        province,
        zip_code,
        latitude,
        longitude,
        main_image: uploadImage?.secure_url || "",
        property_category: property_category,
    });
    return newProperty;
};
exports.createPropertyServices = createPropertyServices;
const getPropertyByLocationServices = async (lat, lng, radius, checkIn, checkOut, category, minPrice, maxPrice, guests, rooms) => {
    if (!checkIn || !checkOut) {
        throw new Error("checkIn dan checkOut wajib diisi");
    }
    return await (0, property_repository_1.findNearbyPropertiesRepository)(lat, lng, radius, checkIn, checkOut, category, minPrice, maxPrice, guests, rooms);
};
exports.getPropertyByLocationServices = getPropertyByLocationServices;
const updatePropertyServices = async (propertyId, data, file, tenant_id) => {
    const existingProperty = await (0, property_repository_1.findPropertyByIdRepository)(propertyId);
    if (!existingProperty) {
        throw new AppError_1.default("Property not found", 404);
    }
    const { name, description, address, city, province, zip_code, latitude, longitude, property_category, } = data;
    let uploadImage = null;
    if (file) {
        uploadImage = await (0, cloudinary_1.handleUpload)(file);
    }
    const normalizedCategory = property_category.toLowerCase();
    const isValidCategory = Object.values(client_1.PropertyCategory).includes(normalizedCategory);
    if (!isValidCategory) {
        throw new AppError_1.default("Invalid property category", 400);
    }
    const updatedProperty = await (0, property_repository_1.updatePropertyRepository)({
        propertyId,
        tenant_id,
        name,
        description,
        address,
        city,
        province,
        zip_code,
        latitude,
        longitude,
        property_category: property_category,
        main_image: uploadImage?.secure_url || "",
    });
    return updatedProperty;
};
exports.updatePropertyServices = updatePropertyServices;
const deletePropertyService = async (propertyId, tenant_id) => {
    const existingProperty = await (0, property_repository_1.findPropertyByIdRepository)(propertyId);
    if (!existingProperty) {
        throw new AppError_1.default("Property not found", 404);
    }
    return await (0, property_repository_1.softDeletePropertyRepository)(propertyId, tenant_id);
};
exports.deletePropertyService = deletePropertyService;
//# sourceMappingURL=property.service.js.map