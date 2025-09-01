import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./BookingCard";
import { Booking } from "@/types/transactions/transactions";

const BookingCardSkeleton = () => (
  <div className="h-40 w-full bg-gray-100 rounded-lg animate-pulse"></div>
);

type BookingListProps = {
  bookings?: Booking[];
  isLoading: boolean;
  isError: boolean;
};

export const BookingList = ({
  bookings,
  isLoading,
  isError,
}: BookingListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <BookingCardSkeleton />
        <BookingCardSkeleton />
        <BookingCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-bold">
        {" "}
        Failed to load bookings.
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No bookings found
        </h3>
        <p className="text-gray-500 mb-4">
          {" "}
          Try adjusting your filters or start a new search!
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Browse Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
