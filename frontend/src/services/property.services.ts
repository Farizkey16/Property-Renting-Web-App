<<<<<<< HEAD
import { createProperty, PropertyResponse } from "@/types/property/property";
=======
>>>>>>> main
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllProperties = async (params?: {
  property_category?: string;
}) => {
  const response = await axios.get(`${BASE_URL}/property/all`, { params });
  console.log(response.data);
  return response.data;
};
<<<<<<< HEAD

export const createPropertyServices = async (tenant: createProperty) => {
  const formData = new FormData();
  formData.append("name", tenant.name);
  formData.append("description", tenant.description);
  formData.append("address", tenant.address);
  formData.append("city", tenant.city);
  formData.append("province", tenant.province);
  formData.append("zip_code", tenant.zip_code);
  formData.append("latitude", tenant.latitude);
  formData.append("longitude", tenant.longitude);
  formData.append("main_image", tenant.main_image);
  formData.append("property_category", tenant.property_category);

  const response = await axios.post(`${BASE_URL}/property/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};

export const fetchPropertyByTenant = async (): Promise<PropertyResponse> => {
  const response = await axios.get(`${BASE_URL}/property/tenant`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

// property.services.ts
export const fetchPropertyByLocation = async (
  latitude: number,
  longitude: number,
  radius: number,
  checkIn?: string,
  checkOut?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString(),
  });

  if (checkIn) params.append("checkIn", checkIn);
  if (checkOut) params.append("checkOut", checkOut);
  if (category) params.append("category", category);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());

  const response = await axios.get(
    `${BASE_URL}/property/nearby?${params.toString()}`
  );
  console.log(response.data);
  return response.data;
};
=======
>>>>>>> main
