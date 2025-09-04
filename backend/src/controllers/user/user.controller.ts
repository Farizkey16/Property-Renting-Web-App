import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import {
  getUserById,
  otpPasswordServices,
  resetPasswordUser,
  updateProfileServices,
} from "../../services/user/user.service";
import { compare } from "bcrypt";

class UserController {
  public async getUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const decrypt = res.locals.decrypt;

      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const userId = decrypt.userId;
      console.log("userId from token:", userId);
      const user = await getUserById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
      }
      res.status(200).send({
        message: "User found",
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          is_verified: user.is_verified,
          profile_picture: user.profile_picture,
          tenants: user.tenants,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const decrypt = res.locals.decrypt;
      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }
      const userId = decrypt.userId;
      const response = await updateProfileServices(
        userId,
        req.body,
        req.file as Express.Multer.File
      );

      res.send({ message: "Profile updated", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const decrypt = res.locals.decrypt;
    if (!decrypt || !decrypt.userId) {
      throw new AppError("Unauthorized access", 401);
    }
    const userId = decrypt.userId;
    const exitingUser = await getUserById(userId);
    const { oldPassword, newPassword, otp } = req.body;

    const comparePassword = await compare(
      oldPassword,
      exitingUser.password_hash
    );
    if (!comparePassword) {
      throw new AppError("Invalid password", 401);
    }

    if (exitingUser.reset_password_otp !== otp) {
      throw new AppError("Invalid OTP", 401);
    }

    await resetPasswordUser(userId, newPassword);

    res.status(200).send({
      message: "Password updated",
      success: true,
      user: {
        id: exitingUser.id,
        email: exitingUser.email,
        role: exitingUser.role,
        full_name: exitingUser.full_name,
        is_verified: exitingUser.is_verified,
        profile_picture: exitingUser.profile_picture,
      },
    });
  }

  public async otpChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const decrypt = res.locals.decrypt;
      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }
      const userId = decrypt.userId;
      await otpPasswordServices(userId);
      res.send({ message: "OTP sent to your email", success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
