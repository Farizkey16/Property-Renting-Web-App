"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user/user.controller"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const uploader_1 = require("../middleware/uploader");
class UserRouter {
    route;
    userController;
    constructor() {
        this.route = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/me", VerifyToken_1.verifyToken, this.userController.getUserId);
        this.route.patch("/otp-password", VerifyToken_1.verifyToken, this.userController.otpChangePassword);
        this.route.patch("/reset-password", VerifyToken_1.verifyToken, this.userController.resetPassword);
        this.route.patch("/update-profile", VerifyToken_1.verifyToken, (0, uploader_1.uploaderMemory)().single("profile_picture"), this.userController.updateProfile);
        this.route.patch("/change-email-otp", VerifyToken_1.verifyToken, this.userController.newOtpChangeEmail);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map