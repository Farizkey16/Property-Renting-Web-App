"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTenantBookings, useUserBookings } from "@/hooks/useBookings";
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
  const { data: user, isLoading: isUserLoading } = useFetchMe();

  const role = user?.role;
  

  // State Management
  const filters = useMemo(() => {
    const page = parseInt(searchParams.get("page") as string);
    const urlStatus = searchParams.get("status");
    const status: BookingStatus = isValidBookingStatus(urlStatus)
      ? urlStatus
      : "waiting_confirmation";
    const urlSort = searchParams.get("sort");
    const sort: SortStatus = isValidSort(urlSort) ? urlSort : "asc";

    return {
      status: status,
      sort: sort,
      startDate: searchParams.get("start") ?? undefined,
      endDate: searchParams.get("end") ?? undefined,
      bookingId: searchParams.get("bookingId") ?? undefined,
      page: page,
    };
  }, [searchParams]);

  const userQuery = useUserBookings(filters, { enabled: role === "user" });
  const tenantQuery = useTenantBookings(filters, {
    enabled: role === "tenant",
  });

  const {
    data: response,
    isLoading,
    isError,
    isFetching
  } = role === "tenant" ? tenantQuery : userQuery;

  const bookings = response?.data;
  const meta = response?.meta;

  console.log("fetching from:", response)

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

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(newPage));
    router.push(`/dashboard/bookings?${current.toString()}`);
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

        <CardContent className="py-6">
          {meta && meta.totalPages > 1 && (
            <PaginationControls meta={meta} onPageChange={handlePageChange} />
          )}
          {role && <BookingList
            bookings={bookings}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            role={role}
          />}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
