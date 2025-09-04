"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import MapPages from "./Map";
import { usePropertiesByLocation } from "@/hooks/useProperty";
import { formatCurrency } from "@/lib/utils";
import { PropertyCard } from "../property/property-card";
import { ApiProperty } from "@/types/room/room";
import Link from "next/link";
import MapLoading from "@/components/fragment/loading-error/MapLoading";
import FileNotFoundPages from "@/components/fragment/loading-error/FileNotFound";

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  base_price: number;
  image?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  distance: number;
  rooms: Room[];
}

interface PropertyDiscoveryProps {
  category?: string;
}

export default function PropertyDiscovery({
  category,
}: PropertyDiscoveryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Price range states
  const [tempRange, setTempRange] = useState<number[]>([0, 5_000_000]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5_000_000]);

  useEffect(() => {
    const handler = setTimeout(() => setPriceRange(tempRange), 1500);
    return () => clearTimeout(handler);
  }, [tempRange]);

  // Query params
  const queryLat = searchParams.get("lat");
  const queryLng = searchParams.get("lng");
  const queryRadius = searchParams.get("radius");
  const queryCheckIn = searchParams.get("checkIn");
  const queryCheckOut = searchParams.get("checkOut");
  const queryCategory = category || searchParams.get("category");
  const queryMinPrice = searchParams.get("minPrice");
  const queryMaxPrice = searchParams.get("maxPrice");

  const defaultLat = -8.135751241420579;
  const defaultLng = 112.57835021683894;

  const latitude = queryLat ? parseFloat(queryLat) : defaultLat;
  const longitude = queryLng ? parseFloat(queryLng) : defaultLng;

  // Radius state
  const [tempRadius, setTempRadius] = useState<number[]>([
    Number(queryRadius) || 5,
  ]);
  const [radius, setRadius] = useState<number[]>([Number(queryRadius) || 5]);

  useEffect(() => {
    const handler = setTimeout(() => setRadius(tempRadius), 1500);
    return () => clearTimeout(handler);
  }, [tempRadius]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("lat", latitude.toString());
    params.set("lng", longitude.toString());
    params.set("radius", radius[0].toString());

    if (priceRange[0]) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1]) params.set("maxPrice", priceRange[1].toString());

    if (queryCheckIn) params.set("checkIn", queryCheckIn);
    if (queryCheckOut) params.set("checkOut", queryCheckOut);
    if (queryCategory) params.set("category", queryCategory);

    router.replace(`/property?${params.toString()}`);
  }, [
    latitude,
    longitude,
    radius,
    priceRange,
    queryCheckIn,
    queryCheckOut,
    queryCategory,
    router,
  ]);

  // Fetch data property
  const { data, isLoading, isError } = usePropertiesByLocation(
    latitude,
    longitude,
    radius[0],
    queryCheckIn || undefined,
    queryCheckOut || undefined,
    queryCategory || undefined,
    queryMinPrice ? parseInt(queryMinPrice) : undefined,
    queryMaxPrice ? parseInt(queryMaxPrice) : undefined
  );

  // Filter component
  const FilterSidebar = () => (
    <div className="space-y-6 p-4">
      {/* Radius Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Radius ({radius[0]} km)</Label>
        <Slider
          value={tempRadius}
          onValueChange={setTempRadius}
          max={20}
          min={1}
          step={1}
        />
      </div>

      {/* Price Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Price Range ({formatCurrency(priceRange[0])} –{" "}
          {formatCurrency(priceRange[1])})
        </Label>
        <Slider
          value={tempRange}
          onValueChange={setTempRange}
          min={0}
          max={5_000_000}
          step={500_000}
          className="max-w-sm"
        />
      </div>
    </div>
  );

  if (isLoading) return <MapLoading />;
  if (isError) return <FileNotFoundPages />;

  const noOrInvalidProperties =
    !data?.properties ||
    data.properties.length === 0 ||
    priceRange[0] >= priceRange[1] ||
    radius[0] <= 0;

  return (
    <div className="flex h-auto bg-gray-50">
      <div className="flex-1 flex flex-col">
        <MapPages>
          {() => (
            <div className="p-4 space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                  </DialogHeader>
                  <FilterSidebar />
                </DialogContent>
              </Dialog>

              {/* Grid property */}

              {!noOrInvalidProperties ? (
                data.properties.flatMap((property: ApiProperty) =>
                  property.rooms?.map((room) => (
                    <Link
                      key={room.id}
                      href={{
                        pathname: "/property/search",
                        query: {
                          propertyname: property.name,
                          roomname: room.name,
                          checkIn: queryCheckIn,
                          checkOut: queryCheckOut,
                          category: queryCategory,
                          minPrice: queryMinPrice,
                          maxPrice: queryMaxPrice,
                        },
                      }}
                      className="block">
                      <PropertyCard property={property} room={room} />
                    </Link>
                  ))
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
                  <p className="text-lg font-semibold mb-2">
                    No properties found
                  </p>
                  <p className="text-sm">
                    Try increasing the{" "}
                    <span className="font-medium">radius</span> or adjusting the{" "}
                    <span className="font-medium">price range</span>.
                  </p>
                </div>
              )}
            </div>
          )}
        </MapPages>
      </div>
    </div>
  );
}
