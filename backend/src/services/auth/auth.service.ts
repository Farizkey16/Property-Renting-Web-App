import { compare } from "bcrypt";
import { Role } from "../../../prisma/generated/client";
import { transport } from "../../config/nodemailer";
import AppError from "../../errors/AppError";
import {
  createNewOtp,
  createUser,
  createUserByGoogle,
  findTenantById,
  findUserByEmail,
  updateStatusEmail,
} from "../../repositories/auth/auth.repository";
import { VERIFICATION_EMAIL_TEMPLATE } from "../../utils/emailTemplates";
import { generatedOtp } from "../../utils/generateOtp";
import { hashPassword } from "../../utils/hash";
import { generateTokenAndSetCookie, UserPayload } from "../../utils/jwt";
import { Response } from "express";
import { oauth2Client } from "../../utils/google";
import { google } from "googleapis";

export const registerService = async (data: any) => {
  const { full_name, email, password_hash, role } = data;
  const existingUser = await findUserByEmail(email);
  console.log(existingUser);
  //   validasi email
  if (existingUser) {
    throw new AppError("User already exist", 400);
  }

  // validasi role
  if (!Object.values(Role).includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  // generate otp
  const verificationOtp = generatedOtp();

  const newUser = await createUser({
    full_name,
    email,
    role,
    password_hash: await hashPassword(password_hash),
    is_verified: false,
    verify_otp: verificationOtp,
    verify_otp_expires_at: new Date(Date.now() + 15 * 60 * 1000),
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationOtp
    ),
  });

  const { password_hash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const handleGoogleCallback = async (code: string, res: Response) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2("v2");
  const { data } = await oauth2.userinfo.get({ auth: oauth2Client });

  if (!data.email || !data.name) {
    throw new AppError("Failed to fetch Google profile", 400);
  }

  let user = await findUserByEmail(data.email);
  if (!user) {
    user = await createUserByGoogle({
      email: data.email,
      full_name: data.name,
      profile_picture: data.picture || undefined,
      role: "user",
    });
  }

  const token = generateTokenAndSetCookie(res, {
    id: user.id,
    role: user.role,
  });

  return { user, token };
};

export const loginService = async (data: any, res: Response) => {
  const { email, password_hash } = data;

  // validasi email
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new AppError("User not found", 400);
  }

  // validasi password
  const comparePassword = await compare(
    password_hash,
    existingUser.password_hash
  );
  if (!comparePassword) {
    throw new AppError("Invalid password", 401);
  }
  generateTokenAndSetCookie(res, existingUser);

  const { password_hash: _, ...userWithoutPassword } = existingUser;

  return {
    id: userWithoutPassword.id,
    email: userWithoutPassword.email,
    role: userWithoutPassword.role,
    full_name: userWithoutPassword.full_name,
    is_verified: userWithoutPassword.is_verified,
    profile_picture: userWithoutPassword.profile_picture,
  };
};

export const verifyEmailService = async (data: any) => {
  const { email, verify_otp } = data;
  const existingUser = await findUserByEmail(email);
  // pengecekan email
  if (!existingUser) {
    throw new AppError("User not found", 400);
  }
  // pengecekan otp
  if (existingUser.verify_otp !== verify_otp) {
    throw new AppError("Invalid verification code", 400);
  }
  // pengecekan expired otp
  if (existingUser.verify_otp_expires_at! < new Date()) {
    throw new AppError("Verification code has expired", 400);
  }

  const verifyEmail = await updateStatusEmail({
    email,
    is_verified: true,
  });

  const { password_hash: _, ...userWithoutPassword } = verifyEmail;
  return userWithoutPassword;
};

export const newOtpService = async (data: any) => {
  const { email } = data;
  const existingUser = await findUserByEmail(email);
  //   validasi email
  if (!existingUser) {
    throw new AppError("User not found", 400);
  }
  // generate otp
  const verificationOtp = generatedOtp();
  // update otp to verify email user
  const newOtpUser = await createNewOtp({
    email,
    verify_otp: verificationOtp,
    verify_otp_expires_at: new Date(Date.now() + 15 * 60 * 1000),
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationOtp
    ),
  });

  const { password_hash: _, ...userWithoutPassword } = newOtpUser;
  return userWithoutPassword;
};
