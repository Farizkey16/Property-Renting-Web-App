import {
  createPropertyServices,
  fetchAllProperties,
  fetchPropertyById,
  fetchPropertyByLocation,
  fetchPropertyByTenant,
  getPropertyById,
  updatePropertyService,
} from "@/services/property.services";
import { createProperty, updateProperty } from "@/types/property/property";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProperties = (category?: string) => {
  return useQuery({
    queryKey: ["properties", category],
    queryFn: () =>
      fetchAllProperties(category ? { property_category: category } : {}),
    select: (data) => data.properties,
  });
};

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

export const usePropertyById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, property }: { id: string; property: updateProperty }) =>
      updatePropertyService(id, property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property-by-tenant"] });
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to update property");
    },
  });
};
