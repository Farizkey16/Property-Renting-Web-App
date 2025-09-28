"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../../services/auth/auth.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
class AuthController {
    async register(req, res, next) {
        try {
            await (0, auth_service_1.registerService)(req.body);
            res.status(201).send({ message: "User registered", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { ...user } = await (0, auth_service_1.loginService)(req.body, res);
            res.status(200).send({
                message: "User logged in",
                success: true,
                user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyEmail(req, res, next) {
        try {
            await (0, auth_service_1.verifyEmailService)(req.body);
            res.send({ message: "Email verified", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async newOtp(req, res, next) {
        try {
            await (0, auth_service_1.newOtpService)(req.body);
            res.send({ message: "OTP sent to your email", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            if (!userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            res.clearCookie("token");
            res.send({ message: "User logged out", success: true });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map