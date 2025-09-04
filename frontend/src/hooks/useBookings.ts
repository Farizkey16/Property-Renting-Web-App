import { fetchBookings } from "@/services/transactions.services";
import { useQuery } from "@tanstack/react-query";
import type { FlexibleBookingParams } from "@/services/transactions.services";

export const useBookings = <T extends FlexibleBookingParams>(params: T) => {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => fetchBookings(params),
  });
};

