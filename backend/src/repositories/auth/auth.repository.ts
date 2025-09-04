import { prisma } from "../../config/prisma";
import {
  CreateNewOtp,
  CreateUser,
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

export const updateStatusEmail = async (data: VerifyEmail) => {
  return prisma.users.update({
    where: { email: data.email },
    data,
  });
};
