"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingsToolbar } from "./BookingToolbar";
import { PaginationControl } from "../fragment/pagination-control/PaginationControl";
import { BookingList } from "./BookingList";
import { Booking, Filters, Meta } from "@/types/transactions/transactions";
import { useState } from "react";
import { PastBookingsToolbar } from "./PastBookingToolbar";

interface PastBookingsClientProps {
  bookings: Booking[];
  meta: Meta;
  filters: Filters;
  role: "user" | "tenant";
}

export function PastBookingsClient({
  bookings,
  meta,
  filters,
  role,
}: PastBookingsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFilterChange = (key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    current.set("page", "1");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/dashboard/pastbookings${query}`);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const clearFilters = () => {
    setIsTransitioning(true);
    router.push(`/dashboard/pastbookings`);
  };

  const handlePageChange = (newPage: number) => {
    setIsTransitioning(true);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(newPage));
    router.push(`/dashboard/pastbookings?${current.toString()}`);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="pb-4">
          <PastBookingsToolbar
            filters={filters}
            onClearFilters={clearFilters}
            onFilterChange={handleFilterChange}
          />
        </CardHeader>

        <CardContent className="py-6">
          {meta && meta.totalPages >= 1 && (
            <PaginationControl
              totalItems={meta.totalItems}
              pageSize={meta.limit}
              currentPage={meta.page}
              onPageChange={handlePageChange}
            />
          )}
          {role && (
            <BookingList
              onFileSelect={handleFileSelect}
              uploadFile={uploadFile}
              bookings={bookings}
              role={role}
              isError={false}
              isFetching={isTransitioning}
              isLoading={isTransitioning}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
