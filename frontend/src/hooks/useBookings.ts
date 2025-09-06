import { cancelBookingById, fetchBookings, fetchTenantBookingById, fetchTenantBookings, fetchUserBookingById, fetchUserBookings } from "@/services/transactions.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FetchBookingsParams, FlexibleBookingParams } from "@/services/transactions.services";
import { toast } from "react-toastify";

export const useBookings = <T extends FlexibleBookingParams>(params: T) => {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => fetchBookings(params),
  });
};

export const useBookingById = (bookingId: string | null | undefined) => {
  return useQuery({
    queryKey: ['booking', bookingId], 
    queryFn: () => fetchTenantBookingById(bookingId!), 
    enabled: !!bookingId,
  });
};

export const useUserBookingByQuery = (bookingId: string | null | undefined) =>{
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => fetchUserBookingById(bookingId!),
    enabled: !!bookingId
  })
}

export const useUserBookings = (filters: FetchBookingsParams) => {
  return useQuery({
    queryKey: ['bookings', 'user', filters],
    queryFn: () => fetchUserBookings(filters),
  });
};

export const useTenantBookings = (filters: FetchBookingsParams) => {
  return useQuery({
    queryKey: ['bookings', 'tenant', filters],
    queryFn: () => fetchTenantBookings(filters),
  });
};



export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBookingById,

    onSuccess: () => {
      toast.success("Booking successfully canceled.")

      queryClient.invalidateQueries({ queryKey: ['bookings']})
      queryClient.invalidateQueries({ queryKey: ['booking']})
    },

    onError: (error) => {
      toast.error(error.message)
    }

  })
}

