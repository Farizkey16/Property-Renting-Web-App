import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import {
  CreateNewOtp,
  CreateUser,
  newOtpChangeEmailTypes,
  VerifyEmail,
} from "../../types/user/users.types";

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const createUser = async (data: CreateUser) => {
  return prisma.users.create({
    data,
  });
};

export const createUserByGoogle = async (data: {
  full_name: string;
  email: string;
  profile_picture?: string;
  role?: "tenant" | "user";
}) => {
  return prisma.users.create({
    data: {
      full_name: data.full_name,
      email: data.email,
      profile_picture: data.profile_picture,
      is_verified: true,
      role: data.role || "user",
      password_hash: "",
    },
  });
};

export const createNewOtp = async (data: CreateNewOtp) => {
  return prisma.users.update({
    where: { email: data.email },
    data,
  });
};

export const createNewOtpChangePaaword = async (
  userId: string,
  otp: string
) => {
  return prisma.users.update({
    where: { id: userId },
    data: { reset_password_otp: otp },
  });
};

export const newOtpChangeEmailRepository = async (
  data: newOtpChangeEmailTypes
) => {
  const existingEmail = await prisma.users.findUnique({
    where: { email: data.email },
  });

  if (existingEmail && existingEmail.id !== data.id) {
    throw new AppError("Email already in use", 400);
  }

  return prisma.users.update({
    where: { id: data.id },
    data,
  });
};

export const updateStatusEmail = async (data: VerifyEmail) => {
  return prisma.users.update({
    where: { email: data.email },
    data,
  });
};

export const findTenantById = async (id: string) => {
  return prisma.tenants.findUnique({
    where: { user_id: id },
  });
};
