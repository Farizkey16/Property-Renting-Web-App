import {
  createPropertyServices,
  fetchAllProperties,
  fetchPropertyById,
  fetchPropertyByLocation,
  fetchPropertyByTenant,
  getPropertyById,
  updatePropertyService,
} from "@/services/property.services";
import {
  createProperty,
  PropertyFilters,
  updateProperty,
} from "@/types/property/property";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProperties = (filters: PropertyFilters = {}) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchAllProperties(filters),
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
  latitude: number,
  longitude: number,
  radius: number,
  checkIn?: string,
  checkOut?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  guests?: number,
  rooms?: number
) => {
  return useQuery({
    queryKey: [
      "properties-by-location",
      latitude,
      longitude,
      radius,
      checkIn,
      checkOut,
      category,
      minPrice,
      maxPrice,
      guests,
      rooms,
    ],
    queryFn: () =>
      fetchPropertyByLocation(
        latitude,
        longitude,
        radius,
        checkIn,
        checkOut,
        category,
        minPrice,
        maxPrice,
        guests,
        rooms
      ),
    enabled: !!latitude && !!longitude && !!radius && !!checkIn && !!checkOut,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePropertyById = (id: string) => {
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
