"use client";

import { useProperties } from "@/hooks/useProperty";
import { PropertyCard } from "./property-card";
import { ApiProperty } from "@/types/room/room";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> main

interface PropertyGridProps {
  category: string;
}

export function PropertyGrid({ category }: PropertyGridProps) {
  const { data, isLoading, error } = useProperties(category);

<<<<<<< HEAD
=======
  console.log("Current category:", category); // ✅ cek category update

>>>>>>> main
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading properties</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
<<<<<<< HEAD
      {data?.flatMap((property: ApiProperty) =>
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
      )}
=======
      {data?.map((property: ApiProperty) => (
        <PropertyCard key={property.id} property={property} />
      ))}
>>>>>>> main
    </div>
  );
}
