import {
  loginUser,
  logoutUser,
  newOtP,
  registerUser,
  verifyEmail,
} from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await loginUser(email, password);

      if (res.token) {
        localStorage.setItem("token", res.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      }

      return res;
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => registerUser(name, email, password, role),
  });
};

export const useNewOtpVerification = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => newOtP(email),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyEmail(email, otp),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await logoutUser();
      localStorage.removeItem("token");
      return res;
    },
  });
};
