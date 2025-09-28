"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_service_1 = require("../../services/user/user.service");
const bcrypt_1 = require("bcrypt");
class UserController {
    async getUserId(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            console.log("userId from token:", userId);
            const user = await (0, user_service_1.getUserById)(userId);
            if (!user) {
                throw new AppError_1.default("User not found", 404);
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
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            const response = await (0, user_service_1.updateProfileServices)(userId, req.body, req.file);
            res.send({ message: "Profile updated", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        const decrypt = res.locals.decrypt;
        if (!decrypt || !decrypt.userId) {
            throw new AppError_1.default("Unauthorized access", 401);
        }
        const userId = decrypt.userId;
        const exitingUser = await (0, user_service_1.getUserById)(userId);
        const { oldPassword, newPassword, otp } = req.body;
        const comparePassword = await (0, bcrypt_1.compare)(oldPassword, exitingUser.password_hash);
        if (!comparePassword) {
            throw new AppError_1.default("Invalid password", 401);
        }
        if (exitingUser.reset_password_otp !== otp) {
            throw new AppError_1.default("Invalid OTP", 401);
        }
        await (0, user_service_1.resetPasswordUser)(userId, newPassword);
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
    async otpChangePassword(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            await (0, user_service_1.otpPasswordServices)(userId);
            res.send({ message: "OTP sent to your email", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async newOtpChangeEmail(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            await (0, user_service_1.newOtpChangeEmailServices)(req.body, userId);
            res.send({ message: "OTP sent to your email", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async changeEmail(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            const exitingUser = await (0, user_service_1.getUserById)(userId);
            const { newEmail } = req.body;
        }
        catch (error) { }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map