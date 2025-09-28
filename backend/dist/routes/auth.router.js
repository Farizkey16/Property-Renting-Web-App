"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth/auth.controller"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const authGoogle_1 = __importDefault(require("../controllers/auth/google/authGoogle"));
const auth_1 = require("../middleware/validation/auth");
class AuthRouter {
    route;
    authController;
    authGoogleController;
    constructor() {
        this.route = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.authGoogleController = new authGoogle_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/register", auth_1.regisValidation, this.authController.register);
        this.route.post("/login", this.authController.login);
        this.route.patch("/new-otp", this.authController.newOtp);
        this.route.patch("/verify-email", this.authController.verifyEmail);
        this.route.post("/logout", VerifyToken_1.verifyToken, this.authController.logout);
        this.route.get("/google", this.authGoogleController.login.bind(this.authGoogleController));
        this.route.get("/google/callback", this.authGoogleController.callback.bind(this.authGoogleController));
    }
    getRouter() {
        return this.route;
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map