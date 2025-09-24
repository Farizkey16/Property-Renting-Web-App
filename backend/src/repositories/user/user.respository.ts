import { prisma } from "../../config/prisma";
import { UpdateUser } from "../../types/user/users.types";
import { Prisma } from "@prisma/client";
import AppError from "../../errors/AppError";

export const findUserById = async (userId: string) => {
  return prisma.users.findUnique({
    where: { id: userId },
    include: { tenants: true },
  });
};

export const changePasswordUser = async (
  userId: string,
  newPassword: string
) => {
  return prisma.users.update({
    where: { id: userId },
    data: { password_hash: newPassword },
  });
};

export const getEmailById = async (userId: string) => {
  console.log("Looking for user:", userId);
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  console.log("DB result:", user);
  return user?.email;
};

export const updateProfileRepository = async (
  data: UpdateUser,
  userId: string
) => {
  const user = await prisma.users.update({
    where: {
      id: userId,
    },
    data,
  });
};
export const getEmailAndFullnameById = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      full_name: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    email: user?.email,
    fullname: user?.full_name,
  };
};
