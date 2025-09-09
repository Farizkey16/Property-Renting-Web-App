"use client";

import { LeaveReviewForm } from "@/components/dashboard/leave-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBookings } from "@/hooks/useBookings";
import { FetchBookingsParams } from "@/services/transactions.services";
import {
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
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const HistoryTripsPage = () => {
  const searchParams = useSearchParams();

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

  /**
   * 1. For fetching bookings history, it's better to fetch every booking that has happened BEFORE the page access day
   * 2. That means, we need to set a variable with today's date, and use that as a parameter for useBookings
   * 3. Every booking status is included in that fetch, and filters are used there
   */
  const filters = useMemo(() => {
    const urlStatus = searchParams.get("status");
    const urlEndDate = searchParams.get("endDate");
    const urlSort = searchParams.get("sort");
    const todayDate = new Date().toISOString().split("T")[0];
    const endDateforQuery = urlEndDate || todayDate;
    const defaultQueryStatus = VALID_BOOKING_HISTORY_STATUS
    const status = isValidBookingHistoryStatus(urlStatus) ? [urlStatus] : defaultQueryStatus
    return {
      status: status,
      sort: isValidSort(urlSort) ? urlSort : "desc",
      end: endDateforQuery,
      bookingId: searchParams.get("id") ?? undefined,
    };
  }, [searchParams]);

  const { data: pastBookings, isLoading, isError } = useBookings(filters);

  return (
    <div className="p-6">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-semibold">
              Trip History
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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-4">
            {pastBookings && pastBookings.map((trip) => (
              <Card key={trip.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Property Image */}
                    <div className="w-full lg:w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={trip.property.main_image || "/placeholder.svg"}
                        alt={trip.property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Trip Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {trip.property.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {trip.property.city}
                          </div>
                        </div>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status.charAt(0).toUpperCase() +
                            trip.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(trip.check_in_date).toLocaleDateString()} -{" "}
                            {new Date(trip.check_out_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{trip.booking_rooms.reduce((acc, br) => acc + br.guests_count, 0)} guests</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-semibold text-gray-900">
                            {trip.amount}
                          </span>
                        </div>
                      </div>

                      {/* Rating
                      {trip.property. && (
                        <div className="pt-2">{renderStars(trip.rating)}</div>
                      )} */}

                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          View Details
                        </Button>
                        {trip.status === "confirmed" && (new Date(trip.check_out_date) < new Date()) && (
                          <>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                            
                              <LeaveReviewForm bookingId={trip.id}/> 
                            
                            {/* {!trip.rating && (
                              <Button variant="outline" size="sm">
                                Leave Review
                              </Button>
                            )} */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

export default HistoryTripsPage;
