import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";
import { verifyToken } from "../middleware/VerifyToken";
import GoogleAuthController from "../controllers/auth/google/authGoogle";
import {
  regisValidation,
} from "../middleware/validation/auth";

class AuthRouter {
  private route: Router;
  private authController: AuthController;
  private authGoogleController: GoogleAuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.authGoogleController = new GoogleAuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/register", regisValidation, this.authController.register);
    this.route.post("/login" , this.authController.login);
    this.route.patch("/new-otp", this.authController.newOtp);
    this.route.patch("/verify-email", this.authController.verifyEmail);
    this.route.post("/logout", verifyToken, this.authController.logout);
    this.route.get(
      "/google",
      this.authGoogleController.login.bind(this.authGoogleController)
    );
    this.route.get(
      "/google/callback",
      this.authGoogleController.callback.bind(this.authGoogleController)
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
