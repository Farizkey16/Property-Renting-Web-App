import { AuthResponse } from "@/types/auth/auth";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMe = async () => {
  const response = await axios.get<AuthResponse>(`${BASE_URL}/user/me`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data.user;
};

export const updateProfile = async (
  full_name: string,
  profile_picture: File
) => {
  const formData = new FormData();
  formData.append("full_name", full_name);
  formData.append("profile_picture", profile_picture);
  const response = await axios.patch<AuthResponse>(
    `${BASE_URL}/user/update-profile`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response.data.user;
};

export const newOtp = async () => {
  const response = await axios.patch(
    `${BASE_URL}/user/otp-password`,
    {},
    {
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response.data;
};

export const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  otp: string
) => {
  const response = await axios.patch(
    `${BASE_URL}/user/reset-password`,
    { oldPassword, newPassword, otp },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const changeEmailOtp = async (email: string) => {
  const response = await axios.patch(
    `${BASE_URL}/user/change-email-otp`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  console.log(response.data);
  return response.data;
};
