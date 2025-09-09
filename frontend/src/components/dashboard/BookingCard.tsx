import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Booking } from "@/types/transactions/transactions";
import { MapPin, Calendar, Users } from "lucide-react";
import {
  useCancelBookingByRole,
  useTenantAcceptBooking,
  useTenantCancelBooking,
  useTenantRejectBooking,
  useUserCancelBooking,
} from "@/hooks/useBookings";
import { formatCurrency } from "@/lib/utils";

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    case "pending":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "cancelled":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

export type BookingCardProps = {
  booking: Booking;
  role: "tenant" | "user";
};

export const BookingCard = ({ booking, role }: BookingCardProps) => {
  const cancelBookingMutation = useCancelBookingByRole(role);
  const acceptBookingMutation = useTenantAcceptBooking()
  const rejectBookingMutation = useTenantRejectBooking()
  const guests = booking.booking_rooms.reduce(
    (acc, num) => acc + num.guests_count,
    0
  );
  const price = booking.amount;

  console.log("Booking data:", booking);

  const handleCancel = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  const handleAccept = (bookingId: string) => {
    if (window.confirm("Are you sure you want to accept this booking?")) {
      acceptBookingMutation.mutate(bookingId)
    }
  }

  const handleReject = (bookingId: string) => {
    if (window.confirm("Are you sure you want to reject this booking?")) {
      rejectBookingMutation.mutate(bookingId)
    }
  }

  return (
    <CardContent className="px-1 py-4">
      <div className="space-y-4">
        {/* Render a single booking card for the passed booking prop */}
        <Card key={booking.id} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Property Image */}
              <div className="w-full lg:w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={booking.property?.main_image ?? "/placeholder.svg"}
                  alt={booking.property?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking?.property?.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.property?.city}
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                      {new Date(booking.check_out_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{`${guests} guest(s)`}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {`Total Price: ${formatCurrency(price)}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {role === "tenant" ? (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                      onClick={() => handleAccept(booking.id)}
                    >
                      {" "}
                      Accept
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    >
                      {" "}
                      View Booking
                    </Button>
                  )}

                  {role === "tenant" ? (
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 cursor-pointer"
                      onClick={() => handleReject(booking.id)}
                    >
                      {" "}
                      Reject
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 cursor-pointer"
                    >
                      {" "}
                      Modify Booking
                    </Button>
                  )}

                  {role === "tenant" ? (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                      onClick={() => handleAccept(booking.id)}
                    >
                      {" "}
                      View Proof
                    </Button>
                  ) : ""}

                  {booking.status === "waiting_payment" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent cursor-pointer"
                      disabled={cancelBookingMutation.isPending}
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};
