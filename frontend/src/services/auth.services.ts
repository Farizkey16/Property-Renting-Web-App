import { AuthResponse } from "@/types/auth/auth";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/register`, {
    full_name: name,
    email,
    password_hash: password,
    role,
  });
  console.log(response.data);
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
    email,
    password_hash: password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }

  return response.data;
};
export const newOtP = async (email: string): Promise<AuthResponse> => {
  const response = await axios.patch<AuthResponse>(`${BASE_URL}/auth/new-otp`, {
    email,
  });
  console.log(response.data);
  return response.data;
};

export const verifyEmail = async (
  email: string,
  otp: string
): Promise<AuthResponse> => {
  const response = await axios.patch<AuthResponse>(
    `${BASE_URL}/auth/verify-email`,
    {
      email,
      verify_otp: otp,
    }
  );
  console.log(response.data);
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  return { message: "Logged out", success: true };
};
