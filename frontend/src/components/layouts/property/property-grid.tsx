"use client";

import FileNotFoundPages from "@/components/fragment/loading-error/FileNotFound";
import { ApiProperty } from "@/types/room/room";
import Link from "next/link";
import { PropertyCard } from "./property-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PropertyGridProps {
  data: (ApiProperty["rooms"][0] & { property: ApiProperty })[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export function PropertyGrid({
  data,
  total,
  page,
  itemsPerPage,
}: PropertyGridProps) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    router.push(`?${params.toString()}#properties`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {data.length === 0 ? (
          <div className="col-span-full flex justify-center">
            <FileNotFoundPages />
          </div>
        ) : (
          data.map((room) => (
            <Link
              key={room.id}
              href={{
                pathname: "/property/search",
                query: {
                  propertyname: room.property.name,
                  roomname: room.name,
                },
              }}
              target="_blank">
              <PropertyCard property={room.property} room={room} />
            </Link>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}>
                <PaginationPrevious href="#" />
              </button>
            </PaginationItem>

            {/* Pages */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <button onClick={() => goToPage(pageNumber)}>
                    <PaginationLink isActive={pageNumber === page}>
                      {pageNumber}
                    </PaginationLink>
                  </button>
                </PaginationItem>
              );
            })}

            {/* Next */}
            <PaginationItem>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }>
                <PaginationNext href="#" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
