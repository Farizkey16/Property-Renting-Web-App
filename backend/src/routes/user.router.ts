import { Router } from "express";
import UserController from "../controllers/user/user.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { uploaderMemory } from "../middleware/uploader";

class UserRouter {
  private route: Router;
  private userController: UserController;

  constructor() {
    this.route = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/me", verifyToken, this.userController.getUserId);
    this.route.post(
      "/otp-password",
      verifyToken,
      this.userController.otpChangePassword
    );
    this.route.patch(
      "/reset-password",
      verifyToken,
      this.userController.resetPassword
    );
    this.route.patch(
      "/update-profile",
      verifyToken,
      uploaderMemory().single("profile_picture"),
      this.userController.updateProfile
    );
    this.route.patch(
      "/change-email-otp",
      verifyToken,
      this.userController.newOtpChangeEmail
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default UserRouter;
