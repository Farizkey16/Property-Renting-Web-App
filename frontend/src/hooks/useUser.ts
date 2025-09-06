import {
  changeEmailOtp,
  fetchMe,
  newOtp,
  resetPassword,
  updateProfile,
} from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { full_name: string; profile_picture?: File }) =>
      updateProfile(data.full_name, data.profile_picture!),
    onSuccess: () => {
      alert("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export function useNewOtp() {
  return useMutation({
    mutationFn: async () => {
      return await newOtp();
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
      otp,
    }: {
      oldPassword: string;
      newPassword: string;
      otp: string;
    }) => {
      return await resetPassword(oldPassword, newPassword, otp);
    },
  });
}

export function useChangeEmailOtp() {
  return useMutation({
    mutationFn: async (email: string) => {
      return await changeEmailOtp(email);
    },
  });
}
