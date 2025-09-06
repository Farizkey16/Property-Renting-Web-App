import { Role } from "../../../prisma/generated/client";

export type CreateUser = {
  role: Role;
  full_name: string;
  email: string;
  password_hash: string;
  profile_picture?: string | null;
  is_verified: boolean;
  reset_password_otp?: string | null;
  verify_otp?: string | null;
  verify_otp_expires_at?: Date | null;
};

export type UpdateUser = {
  full_name: string;
  profile_picture?: string | null;
};

export type CreateNewOtp = {
  email: string;
  verify_otp?: string | null;
  verify_otp_expires_at?: Date | null;
  reset_password_otp?: string | null;
};

export type newOtpChangeEmailTypes = {
  id: string;
  email: string;
  verify_otp?: string | null;
  verify_otp_expires_at?: Date | null;
  reset_password_otp?: string | null;
  is_verified: boolean;
};

export type VerifyEmail = {
  email: string;
  is_verified: boolean;
};
