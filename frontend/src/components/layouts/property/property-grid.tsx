"use client";

import { useProperties } from "@/hooks/useProperty";
import { PropertyCard } from "./property-card";
import { ApiProperty } from "@/types/room/room";
import Link from "next/link";
import FileNotFoundPages from "@/components/fragment/loading-error/FileNotFound";
import { PropertyCardSkeleton } from "@/components/fragment/loading-error/PropertyCardSkeleton";
import { PropertyFilters } from "@/types/property/property";

interface PropertyGridProps {
  filters?: PropertyFilters;
}

export function PropertyGrid({ filters = {} }: PropertyGridProps) {
  const { data, isLoading, error } = useProperties(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <PropertyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-red-500">Error loading properties</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {!data || data.length === 0 ? (
        <div className="col-span-full flex justify-center overflow-x-hidden">
          <div className="w-full max-w-2xl">
            <FileNotFoundPages />
          </div>
        </div>
      ) : (
        data?.flatMap((property: ApiProperty) =>
          property.rooms?.map((room) => (
            <Link
              key={room.id}
              href={{
                pathname: "/property/search",
                query: {
                  propertyname: property.name,
                  roomname: room.name,
                },
              }}
              className="block">
              <PropertyCard property={property} room={room} />
            </Link>
          ))
        )
      )}
    </div>
  );
}
