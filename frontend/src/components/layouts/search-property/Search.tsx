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

export default function PropertyDiscovery({ category }: { category?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query params
  const queryLat = searchParams.get("latitude");
  const queryLng = searchParams.get("longitude");
  const queryRadius = searchParams.get("radius") || "5";
  const queryCheckIn = searchParams.get("checkIn") || "";
  const queryCheckOut = searchParams.get("checkOut") || "";
  const queryCategory = category || searchParams.get("category") || "";
  const queryMinPrice = searchParams.get("minPrice") || "0";
  const queryMaxPrice = searchParams.get("maxPrice") || "5000000";
  const queryGuests = searchParams.get("guests") || "1";
  const queryRooms = searchParams.get("rooms") || "1";

  // Default location
  const defaultLat = -8.135751241420579;
  const defaultLng = 112.57835021683894;
  const latitude = queryLat ? parseFloat(queryLat) : defaultLat;
  const longitude = queryLng ? parseFloat(queryLng) : defaultLng;

  // Radius state
  const [tempRadius, setTempRadius] = useState<number[]>([
    parseInt(queryRadius),
  ]);
  const [radius, setRadius] = useState<number[]>([parseInt(queryRadius)]);

  // Price state
  const [tempRange, setTempRange] = useState<number[]>([
    parseInt(queryMinPrice),
    parseInt(queryMaxPrice),
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([
    parseInt(queryMinPrice),
    parseInt(queryMaxPrice),
  ]);

  // Date state
  const [checkIn, setCheckIn] = useState<string>(queryCheckIn);
  const [checkOut, setCheckOut] = useState<string>(queryCheckOut);

  // Debounce radius & price range
  useEffect(() => {
    const handler = setTimeout(() => setRadius(tempRadius), 500);
    return () => clearTimeout(handler);
  }, [tempRadius]);

  useEffect(() => {
    const handler = setTimeout(() => setPriceRange(tempRange), 500);
    return () => clearTimeout(handler);
  }, [tempRange]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Lokasi
    params.set("latitude", latitude.toString());
    params.set("longitude", longitude.toString());

    // Radius
    params.set("radius", radius[0].toString());

    // Price
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    // Guests & Rooms
    params.set("guests", queryGuests.toString());
    params.set("rooms", queryRooms.toString());

    // Date
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    // Category
    if (queryCategory) params.set("category", queryCategory);

    // Update URL tanpa reload
    router.replace(`/property?${params.toString()}`);
  }, [
    latitude,
    longitude,
    radius,
    priceRange,
    checkIn,
    checkOut,
    queryCategory,
    router,
    queryGuests,
    queryRooms,
  ]);

  // Fetch properties
  const { data, isLoading, isError } = usePropertiesByLocation(
    latitude,
    longitude,
    radius[0],
    checkIn || undefined,
    checkOut || undefined,
    queryCategory || undefined,
    priceRange[0],
    priceRange[1],
    Number(queryGuests),
    Number(queryRooms)
  );

  // Filter Sidebar
  const FilterSidebar = () => (
    <div className="space-y-6 p-4">
      {/* Radius */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Radius ({radius[0]} km)</Label>
        <Slider
          value={tempRadius}
          onValueChange={setTempRadius}
          min={1}
          max={20}
          step={1}
        />
      </div>
      {/* Price */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Price ({formatCurrency(priceRange[0])} –{" "}
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
      {/* Date picker */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Check-in & Check-out</Label>
        <div className="flex gap-2">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border rounded p-1"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border rounded p-1"
          />
        </div>
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
        <MapPages properties={data?.properties ?? []}>
          {() => (
            <div className="p-4 space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                  </DialogHeader>
                  <FilterSidebar />
                </DialogContent>
              </Dialog>

              {!noOrInvalidProperties ? (
                data.properties.flatMap((property: ApiProperty) =>
                  property.rooms?.map((room) => (
                    <Link
                      key={property.id + "-" + room.id}
                      href={{
                        pathname: "/property/search",
                        query: {
                          propertyname: property.name,
                          roomname: room.name,
                          checkIn,
                          checkOut,
                          guests: queryGuests,
                          rooms: queryRooms,
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
