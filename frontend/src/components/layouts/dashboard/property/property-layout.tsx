"use client";

import React from "react";
import { PropertyCard } from "./card-property";
import { Pencil, Plus, Trash2Icon } from "lucide-react";
import {
  usePropertyByTenant,
  useSoftDeleteProperty,
} from "@/hooks/useProperty";
import { Property } from "@/types/property/property";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { RoomList } from "../room/room-list";
import LoadingSpinner from "@/components/fragment/loading-error/LoadingSpinner";

const PropertyLayout = () => {
  const { data, isLoading, isError } = usePropertyByTenant();
  const { mutate: deleteProperty } = useSoftDeleteProperty();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Failed to load data</p>;

  const properties: Property[] = data?.properties || [];

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="space-y-6">
        {/* Property Cards */}
        <h1 className="text-2xl font-bold">List of Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card "Add New Property" */}
          <Link href="/dashboard/property/create">
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center justify-center h-80 text-muted-foreground">
                <Plus className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Add New Property</p>
              </CardContent>
            </Card>
          </Link>

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              name={property.name}
              city={property.city}
              category={property.property_category}
              roomsCount={property.rooms?.length || 0}
              mainImage={property.main_image}
              EditIcon={Pencil}
              DeleteIcon={Trash2Icon}
              editHref={`/dashboard/property/edit/${property.id}`}
              onDelete={() => {
                deleteProperty(property.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Rooms per property */}
      <div className="mt-10 space-y-6">
        {properties.map((property) => (
          <div key={property.id}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{property.name} - Rooms</h2>
              <Link
                href={`/dashboard/property/room/create/${property.id}`}
                className="text-sm text-blue-500 hover:underline">
                + Add New Room
              </Link>
            </div>
            <RoomList rooms={property.rooms || []} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PropertyLayout;
