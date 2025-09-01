<<<<<<< HEAD
import {
  createPropertyServices,
  fetchAllProperties,
  fetchPropertyByLocation,
  fetchPropertyByTenant,
} from "@/services/property.services";
import { createProperty } from "@/types/property/property";
import { useMutation, useQuery } from "@tanstack/react-query";
=======
import { fetchAllProperties } from "@/services/property.services";
import { useQuery } from "@tanstack/react-query";
>>>>>>> main

export const useProperties = (category?: string) => {
  return useQuery({
    queryKey: ["properties", category],
    queryFn: () =>
      fetchAllProperties(category ? { property_category: category } : {}),
    select: (data) => data.properties,
  });
};
<<<<<<< HEAD

export const useCreateProperty = () => {
  return useMutation({
    mutationFn: (property: createProperty) => createPropertyServices(property),
  });
};

export const usePropertyByTenant = () => {
  return useQuery({
    queryKey: ["property-by-tenant"],
    queryFn: () => fetchPropertyByTenant(),
  });
};

export const usePropertiesByLocation = (
  lat: number,
  lng: number,
  radius: number,
  checkIn?: string,
  checkOut?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  return useQuery({
    queryKey: [
      "properties-by-location",
      lat,
      lng,
      radius,
      checkIn,
      checkOut,
      category,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      fetchPropertyByLocation(
        lat,
        lng,
        radius,
        checkIn,
        checkOut,
        category,
        minPrice,
        maxPrice
      ),
    enabled: !!lat && !!lng && !!radius,
    staleTime: 1000 * 60 * 5,
  });
};
=======
>>>>>>> main
