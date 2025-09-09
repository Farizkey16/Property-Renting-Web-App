"use client";

import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { useBookingById, useBookings, useTenantBookings } from "@/hooks/useBookings";
import { useMemo } from "react";
import { useFetchMe } from "@/hooks/useUser";
import type { FetchBookingsParams } from "@/services/transactions.services";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookingStatus,
  isValidBookingStatus,
  isValidSort,
  SortStatus,
} from "@/types/transactions/transactions";
import { BookingList } from "@/components/dashboard/BookingList";
import { BookingsToolbar } from "@/components/dashboard/BookingToolbar";

const BookingsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: user, isLoading: isUserLoading } = useFetchMe()

  

  // State Management
  const filters = useMemo(() => {
    const urlStatus = searchParams.get("status");
    const status: BookingStatus = isValidBookingStatus(urlStatus)
      ? urlStatus
      : "waiting_payment";
    const urlSort = searchParams.get("sort");
    const sort: SortStatus = isValidSort(urlSort) ? urlSort : "asc";

    return {
      status: status,
      sort: sort,
      startDate: searchParams.get("start") ?? undefined,
      endDate: searchParams.get("end") ?? undefined,
      bookingId: searchParams.get("id") ?? undefined,
    };
  }, [searchParams]);

  const { data: bookings, isLoading, isError } = useTenantBookings(filters);

  type FilterKeys = keyof FetchBookingsParams;

  const handleFilterChange = (key: FilterKeys, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/dashboard/bookings${query}`);
  };

  const clearFilters = () => {
    router.push(`/dashboard/bookings`);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="pb-4">
          <BookingsToolbar
            filters={filters}
            onClearFilters={clearFilters}
            onFilterChange={handleFilterChange}
          />
        </CardHeader>

        <CardContent>
          <BookingList
            bookings={bookings}
            isLoading={isLoading}
            isError={isError}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
