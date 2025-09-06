import { Response } from "express";
import { sign } from "jsonwebtoken";
import AppError from "../errors/AppError";

export interface UserPayload {
  id: string;
  role: string;
  tenantId?: string;
}

export const generateTokenAndSetCookie = (
  res: Response,
  existingUser: UserPayload
) => {
  if (!process.env.TOKEN_KEY) {
    throw new AppError("TOKEN_KEY is not set in environment variables", 500);
  }
  const token = sign(
    {
      userId: existingUser.id,
      role: existingUser.role,
      tenantId: existingUser.tenantId
    },
    process.env.TOKEN_KEY!,

    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
