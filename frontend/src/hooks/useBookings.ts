import { fetchBookings } from "@/services/transactions.services";
import { useQuery } from "@tanstack/react-query";
import type { FetchBookingsParams } from "@/services/transactions.services";

export const useBookings = (params: FetchBookingsParams) => {
    return useQuery({
        queryKey: ["bookings", params],
        queryFn: () => fetchBookings(params)
    })
}