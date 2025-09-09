import { PropertyCategory } from "../../../prisma/generated/client";
import { handleUpload } from "../../config/cloudinary";
import AppError from "../../errors/AppError";
import {
  createPropertyRepository,
  findNearbyPropertiesRepository,
  findPropertyByIdRepository,
  getAllPropertiesRepository,
  getPropertyByIdRepository,
  softDeletePropertyRepository,
  updatePropertyRepository,
} from "../../repositories/property/property.repository";
import { PropertyTypes } from "../../types/property/property.types";

export const getAllPropertiesService = async (filter: {
  property_category?: string;
  name?: string;
}) => {
  const response = await getAllPropertiesRepository({
    property_category: filter.property_category,
    name: filter.name,
  });
  return response;
};

export const getPropertyByIdService = async (id: string) => {
  const existingProperty = await findPropertyByIdRepository(id);
  if (!existingProperty) {
    throw new AppError("Property not found", 404);
  }
  const response = await getPropertyByIdRepository(id);
  return response;
};

export const createPropertyServices = async (
  data: PropertyTypes,
  file: Express.Multer.File,
  tenant_id: string
) => {
  const {
    name,
    description,
    address,
    city,
    province,
    zip_code,
    latitude,
    longitude,
    property_category,
  } = data;

  let uploadImage = null;
  if (file) {
    uploadImage = await handleUpload(file);
  }
  const normalizedCategory = property_category.toLowerCase();

  const isValidCategory = Object.values(PropertyCategory).includes(
    normalizedCategory as PropertyCategory
  );

  if (!isValidCategory) {
    throw new AppError("Invalid property category", 400);
  }

  const newProperty = await createPropertyRepository({
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
    property_category: property_category as PropertyCategory,
  });

  return newProperty;
};

export const getPropertyByLocationServices = async (
  lat: number,
  lng: number,
  radius: number,
  checkIn?: string,
  checkOut?: string,
  category?: PropertyCategory,
  minPrice?: number,
  maxPrice?: number,
  guests?: number,
  rooms?: number
) => {
  if (!checkIn || !checkOut) {
    throw new Error("checkIn dan checkOut wajib diisi");
  }
  return await findNearbyPropertiesRepository(
    lat,
    lng,
    radius,
    checkIn,
    checkOut,
    category,
    minPrice,
    maxPrice,
    guests,
    rooms
  );
};

export const updatePropertyServices = async (
  propertyId: string,
  data: PropertyTypes,
  file: Express.Multer.File,
  tenant_id: string
) => {
  const existingProperty = await findPropertyByIdRepository(propertyId);
  if (!existingProperty) {
    throw new AppError("Property not found", 404);
  }

  const {
    name,
    description,
    address,
    city,
    province,
    zip_code,
    latitude,
    longitude,
    property_category,
  } = data;

  let uploadImage = null;
  if (file) {
    uploadImage = await handleUpload(file);
  }
  const normalizedCategory = property_category.toLowerCase();

  const isValidCategory = Object.values(PropertyCategory).includes(
    normalizedCategory as PropertyCategory
  );

  if (!isValidCategory) {
    throw new AppError("Invalid property category", 400);
  }

  const updatedProperty = await updatePropertyRepository({
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
    property_category: property_category as PropertyCategory,
    main_image: uploadImage?.secure_url || "",
  });
  return updatedProperty;
};

export const deletePropertyService = async (
  propertyId: string,
  tenant_id: string
) => {
  const existingProperty = await findPropertyByIdRepository(propertyId);
  if (!existingProperty) {
    throw new AppError("Property not found", 404);
  }
  return await softDeletePropertyRepository(propertyId, tenant_id);
};
