import { handleUpload } from "../../config/cloudinary";
import { transport } from "../../config/nodemailer";
import AppError from "../../errors/AppError";
import {
  createNewOtp,
  newOtpChangeEmailRepository,
} from "../../repositories/auth/auth.repository";
import {
  changePasswordUser,
  findUserById,
  getEmailById,
  updateProfileRepository,
} from "../../repositories/user/user.respository";
import { UpdateUser } from "../../types/user/users.types";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../../utils/emailTemplates";
import { generatedOtp } from "../../utils/generateOtp";
import { hashPassword } from "../../utils/hash";

export const getUserById = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const resetPasswordUser = async (
  userId: string,
  newPassword: string
) => {
  const newHashedPassword = await hashPassword(newPassword);
  const changePassword = await changePasswordUser(userId, newHashedPassword);

  return changePassword;
};

export const otpPasswordServices = async (userId: string) => {
  // generate otp
  const email = await getEmailById(userId);

  if (!email) {
    throw new AppError("User email not found", 404);
  }

  const verificationOtp = generatedOtp();
  const otpPassword = await createNewOtp({
    email,
    reset_password_otp: verificationOtp,
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{verificationCode}",
      verificationOtp
    ),
  });

  return otpPassword;
};

export const updateProfileServices = async (
  userId: string,
  data: UpdateUser,
  file?: Express.Multer.File
) => {
  const { full_name } = data;

  const existingUser = await findUserById(userId);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  let uploadImage = null;
  if (file) {
    uploadImage = await handleUpload(file);
  }

  const updatedUser = await updateProfileRepository(
    {
      full_name,
      profile_picture: uploadImage?.secure_url || existingUser.profile_picture,
    },
    userId
  );

  return updatedUser;
};

export const newOtpChangeEmailServices = async (data: any, userId: string) => {
  const { email } = data;

  const existingUser = await findUserById(userId);
  if (!existingUser) {
    throw new AppError("User not found", 400);
  }
  const verificationOtp = generatedOtp();
  const newOtpUser = await newOtpChangeEmailRepository({
    id: userId,
    email,
    verify_otp: verificationOtp,
    verify_otp_expires_at: new Date(Date.now() + 15 * 60 * 1000),
    is_verified: false,
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

  return newOtpUser;
};
