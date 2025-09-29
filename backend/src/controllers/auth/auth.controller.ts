import { NextFunction, Request, Response } from "express";
import {
  loginService,
  newOtpService,
  registerService,
  verifyEmailService,
} from "../../services/auth/auth.service";
import AppError from "../../errors/AppError";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await registerService(req.body);
      res.status(201).send({ message: "User registered", success: true });
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ...user } = await loginService(req.body, res);
      res.status(200).send({
        message: "User logged in",
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          is_verified: user.is_verified,
          profile_picture: user.profile_picture,
        },
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await verifyEmailService(req.body);
      res.send({ message: "Email verified", success: true });
    } catch (error) {
      next(error);
    }
  }

  public async newOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await newOtpService(req.body);
      res.send({ message: "OTP sent to your email", success: true });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decrypt.userId;
      if (!userId) {
        throw new AppError("Unauthorized access", 401);
      }
      res.clearCookie("token");
      res.send({ message: "User logged out", success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
