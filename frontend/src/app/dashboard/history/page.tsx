"use client";

import { BookingCard } from "@/components/dashboard/BookingCard";
import { LeaveReviewForm } from "@/components/dashboard/leave-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/PaginationControl";
import { useBookings } from "@/hooks/useBookings";
import { formatCurrency } from "@/lib/utils";
import { FetchBookingsParams } from "@/services/transactions.services";
import {
  Booking,
  BookingStatus,
  isValidBookingHistoryStatus,
  isValidSort,
  VALID_BOOKING_HISTORY_STATUS,
} from "@/types/transactions/transactions";
import { dataTagErrorSymbol } from "@tanstack/react-query";
import { access } from "fs";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Star,
  Download,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const PastBookingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const BookingCardSkeleton = () => (
  <div className="h-40 w-full bg-gray-100 rounded-lg animate-pulse"></div>
);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const filters = useMemo(() => {
    const page = parseInt(searchParams.get("page") as string);
    const urlStatus = searchParams.get("status");
    const urlEndDate = searchParams.get("endDate");
    const urlSort = searchParams.get("sort");
    const todayDate = new Date().toISOString().split("T")[0];
    const endDateforQuery = urlEndDate || todayDate;
    const defaultQueryStatus = VALID_BOOKING_HISTORY_STATUS;
    const status = isValidBookingHistoryStatus(urlStatus)
      ? [urlStatus]
      : defaultQueryStatus;
    return {
      status: status,
      sort: isValidSort(urlSort) ? urlSort : "desc",
      end: endDateforQuery,
      bookingId: searchParams.get("id") ?? undefined,
      page: page
    };
  }, [searchParams]);

  const { data: response, isLoading, isError } = useBookings(filters);  

  const pastBookings = response?.data;
  const pastBookingsMeta = response?.meta;

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(newPage));
    router.push(`/dashboard/history?${current.toString()}`);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-7xl mx-auto py-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-semibold">
              Past Bookings
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search trips..."
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        {pastBookingsMeta && pastBookingsMeta.totalPages > 1 && (
          <PaginationControls
            meta={pastBookingsMeta}
            onPageChange={handlePageChange}
          />
        )}

        <CardContent className="p-6">
          <div className="space-y-4">
            {pastBookings &&
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} role="user" />
              ))}
          </div>

          {pastBookings && pastBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No booking history
              </h3>
              <p className="text-gray-500 mb-4">
                Your completed bookings will appear here.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Start Exploring
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PastBookingsPage;
