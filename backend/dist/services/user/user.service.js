"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOtpChangeEmailServices = exports.updateProfileServices = exports.otpPasswordServices = exports.resetPasswordUser = exports.getUserById = void 0;
const cloudinary_1 = require("../../config/cloudinary");
const nodemailer_1 = require("../../config/nodemailer");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_repository_1 = require("../../repositories/auth/auth.repository");
const user_respository_1 = require("../../repositories/user/user.respository");
const emailTemplates_1 = require("../../utils/emailTemplates");
const generateOtp_1 = require("../../utils/generateOtp");
const hash_1 = require("../../utils/hash");
const getUserById = async (userId) => {
    const user = await (0, user_respository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    return user;
};
exports.getUserById = getUserById;
const resetPasswordUser = async (userId, newPassword) => {
    const newHashedPassword = await (0, hash_1.hashPassword)(newPassword);
    const changePassword = await (0, user_respository_1.changePasswordUser)(userId, newHashedPassword);
    return changePassword;
};
exports.resetPasswordUser = resetPasswordUser;
const otpPasswordServices = async (userId) => {
    const email = await (0, user_respository_1.getEmailById)(userId);
    if (!email) {
        throw new AppError_1.default("User email not found", 404);
    }
    const verificationOtp = (0, generateOtp_1.generatedOtp)();
    const otpPassword = await (0, auth_repository_1.createNewOtpChangePaaword)(userId, verificationOtp);
    await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",
        html: emailTemplates_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{verificationCode}", verificationOtp),
    });
    return otpPassword;
};
exports.otpPasswordServices = otpPasswordServices;
const updateProfileServices = async (userId, data, file) => {
    const { full_name } = data;
    const existingUser = await (0, user_respository_1.findUserById)(userId);
    if (!existingUser) {
        throw new AppError_1.default("User not found", 404);
    }
    let uploadImage = null;
    if (file) {
        uploadImage = await (0, cloudinary_1.handleUpload)(file);
    }
    const updatedUser = await (0, user_respository_1.updateProfileRepository)({
        full_name,
        profile_picture: uploadImage?.secure_url || existingUser.profile_picture,
    }, userId);
    return updatedUser;
};
exports.updateProfileServices = updateProfileServices;
const newOtpChangeEmailServices = async (data, userId) => {
    const { email } = data;
    const existingUser = await (0, user_respository_1.findUserById)(userId);
    if (!existingUser) {
        throw new AppError_1.default("User not found", 400);
    }
    const verificationOtp = (0, generateOtp_1.generatedOtp)();
    const newOtpUser = await (0, auth_repository_1.newOtpChangeEmailRepository)({
        id: userId,
        email,
        verify_otp: verificationOtp,
        verify_otp_expires_at: new Date(Date.now() + 15 * 60 * 1000),
        is_verified: false,
    });
    await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationOtp),
    });
    return newOtpUser;
};
exports.newOtpChangeEmailServices = newOtpChangeEmailServices;
//# sourceMappingURL=user.service.js.map