"use client";

import { useState } from "react";
import { useProperties } from "@/hooks/useProperty";
import { PropertyCard } from "./property-card";
import { ApiProperty } from "@/types/room/room";
import Link from "next/link";
import FileNotFoundPages from "@/components/fragment/loading-error/FileNotFound";
import { PropertyCardSkeleton } from "@/components/fragment/loading-error/PropertyCardSkeleton";
import { PropertyFilters } from "@/types/property/property";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PropertyGridProps {
  filters?: PropertyFilters;
}

const ITEMS_PER_PAGE = 8;

type PropertyWithRoom = {
  property: ApiProperty;
  room: ApiProperty["rooms"][0];
};

export function PropertyGrid({ filters = {} }: PropertyGridProps) {
  const { data, isLoading, error } = useProperties(filters);
  const [page, setPage] = useState(1);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
          <PropertyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error loading properties</p>;

  // flatten jadi rooms
  const rooms: PropertyWithRoom[] =
    data?.flatMap((property: ApiProperty) =>
      property.rooms?.map((room) => ({ property, room }))
    ) || [];

  // pagination client-side
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedRooms = rooms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {rooms.length === 0 ? (
          <div className="col-span-full flex justify-center overflow-x-hidden">
            <div className="w-full max-w-2xl">
              <FileNotFoundPages />
            </div>
          </div>
        ) : (
          paginatedRooms.map(({ property, room }) => (
            <Link
              key={room.id}
              href={{
                pathname: "/property/search",
                query: { propertyname: property.name, roomname: room.name },
              }}
              target="_blank"
              className="block">
              <PropertyCard property={property} room={room} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(p - 1, 1));
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Pages */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNumber);
                    }}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(p + 1, totalPages));
                }}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
