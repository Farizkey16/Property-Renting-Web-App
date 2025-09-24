import {
  fetchBookings,
  fetchTenantBookingById,
  fetchUserBookingById,
  paymentProofUpload,
  tenantAcceptBookingById,
  tenantCancelBookingById,
  tenantRejectBookingById,
  userCancelBookingById,
} from "@/services/transactions.services";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FetchBookingsParams,
  FlexibleBookingParams,
} from "@/services/transactions.services";
import { toast } from "react-toastify";

export const useBookings = <T extends FlexibleBookingParams>(params: T) => {
  const { status, sort, startDate, endDate, bookingId, page } = params;
  return useQuery({
    queryKey: ["bookings", status, sort, startDate, endDate, bookingId, page],
    queryFn: () => fetchBookings(params),
    placeholderData: keepPreviousData,
  });
};

export const useBookingById = (bookingId: string | null | undefined) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchTenantBookingById(bookingId!),
    enabled: !!bookingId,
  });
};

export const useUserBookingByQuery = (bookingId: string | null | undefined) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchUserBookingById(bookingId!),
    enabled: !!bookingId,
  });
};

export const useUserCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userCancelBookingById,

    onSuccess: () => {
      toast.success("Booking successfully canceled.");

      queryClient.invalidateQueries({ queryKey: ["bookings"], exact:true });
      queryClient.refetchQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"], exact:true });
      queryClient.refetchQueries({ queryKey: ["booking"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useTenantCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantCancelBookingById,

    onSuccess: () => {
      toast.success("Booking successfully canceled.");

      queryClient.invalidateQueries({ queryKey: ["bookings"], exact:true });
      queryClient.refetchQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"], exact:true });
      queryClient.refetchQueries({ queryKey: ["booking"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useTenantAcceptBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantAcceptBookingById,

    onSuccess: () => {
      toast.success("Booking successfully accepted.");

      queryClient.invalidateQueries({ queryKey: ["bookings"], exact:true });
      queryClient.refetchQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"], exact:true });
      queryClient.refetchQueries({ queryKey: ["booking"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useTenantRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantRejectBookingById,

    onSuccess: () => {
      toast.success("Booking successfully rejected.");

      queryClient.invalidateQueries({ queryKey: ["bookings"], exact: true });
      queryClient.refetchQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"], exact: true });
      queryClient.refetchQueries({ queryKey: ["booking"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCancelBookingByRole = (role: "tenant" | "user" | undefined) => {
  const userMutation = useUserCancelBooking();
  const tenantMutation = useTenantCancelBooking();

  return role === "tenant" ? tenantMutation : userMutation;
};

export const useUploadProofMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentProofUpload,

    onSuccess: (data) => {
      toast.success(
        "Payment proof uploaded successfully! Awaiting confirmation."
      );
      const bookingId = data?.data?.id;
      if (bookingId) {
        queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      }
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
