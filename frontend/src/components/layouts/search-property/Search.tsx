import Link from "next/link";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MapPages from "./Map";
import { PropertyCard } from "../property/property-card";
import FileNotFoundPages from "@/components/fragment/loading-error/FileNotFound";
import { ApiProperty } from "@/types/room/room";
import { fetchPropertyByLocation } from "@/services/property.services";
import FilterSidebar from "./FilterSidebar";

export default async function PropertyDiscovery({
  searchParams,
  category,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  category?: string;
}) {
  // Query params
  const queryLat = searchParams.latitude as string | undefined;
  const queryLng = searchParams.longitude as string | undefined;
  const queryRadius = (searchParams.radius as string) || "5";
  const queryCheckIn = (searchParams.checkIn as string) || "";
  const queryCheckOut = (searchParams.checkOut as string) || "";
  const queryCategory = category || (searchParams.category as string) || "";
  const queryMinPrice = (searchParams.minPrice as string) || "0";
  const queryMaxPrice = (searchParams.maxPrice as string) || "5000000";
  const queryGuests = (searchParams.guests as string) || "1";
  const queryRooms = (searchParams.rooms as string) || "1";

  // Default location
  const defaultLat = -8.135751241420579;
  const defaultLng = 112.57835021683894;
  const latitude = queryLat ? parseFloat(queryLat) : defaultLat;
  const longitude = queryLng ? parseFloat(queryLng) : defaultLng;

  try {
    const data = await fetchPropertyByLocation(
      latitude,
      longitude,
      parseInt(queryRadius),
      queryCheckIn || undefined,
      queryCheckOut || undefined,
      queryCategory || undefined,
      parseInt(queryMinPrice),
      parseInt(queryMaxPrice),
      Number(queryGuests),
      Number(queryRooms)
    );

    const noOrInvalidProperties =
      !data?.properties ||
      data.properties.length === 0 ||
      parseInt(queryMinPrice) >= parseInt(queryMaxPrice) ||
      parseInt(queryRadius) <= 0;

    return (
      <div className="flex h-auto bg-gray-50">
        <div className="flex-1 flex flex-col">
          <MapPages properties={data?.properties ?? []}>
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
                          checkIn: queryCheckIn,
                          checkOut: queryCheckOut,
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
          </MapPages>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <FileNotFoundPages />;
  }
}
