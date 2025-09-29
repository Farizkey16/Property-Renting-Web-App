"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOtpService = exports.verifyEmailService = exports.loginService = exports.handleGoogleCallback = exports.registerService = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../../prisma/generated/client");
const nodemailer_1 = require("../../config/nodemailer");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_repository_1 = require("../../repositories/auth/auth.repository");
const emailTemplates_1 = require("../../utils/emailTemplates");
const generateOtp_1 = require("../../utils/generateOtp");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const google_1 = require("../../utils/google");
const googleapis_1 = require("googleapis");
const registerService = async (data) => {
    const { full_name, email, password_hash, role } = data;
    const existingUser = await (0, auth_repository_1.findUserByEmail)(email);
    console.log(existingUser);
    //   validasi email
    if (existingUser) {
        throw new AppError_1.default("User already exist", 400);
    }
    // validasi role
    if (!Object.values(client_1.Role).includes(role)) {
        throw new AppError_1.default("Invalid role", 400);
    }
    // generate otp
    const verificationOtp = (0, generateOtp_1.generatedOtp)();
    const newUser = await (0, auth_repository_1.createUser)({
        full_name,
        email,
        role,
        password_hash: await (0, hash_1.hashPassword)(password_hash),
        is_verified: false,
        verify_otp: verificationOtp,
        verify_otp_expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });
    await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationOtp),
    });
    const { password_hash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};
exports.registerService = registerService;
const handleGoogleCallback = async (code, res) => {
    const { tokens } = await google_1.oauth2Client.getToken(code);
    google_1.oauth2Client.setCredentials(tokens);
    const oauth2 = googleapis_1.google.oauth2("v2");
    const { data } = await oauth2.userinfo.get({ auth: google_1.oauth2Client });
    if (!data.email || !data.name) {
        throw new AppError_1.default("Failed to fetch Google profile", 400);
    }
    let user = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (!user) {
        user = await (0, auth_repository_1.createUserByGoogle)({
            email: data.email,
            full_name: data.name,
            profile_picture: data.picture || undefined,
            role: "user",
        });
    }
    const token = (0, jwt_1.generateTokenAndSetCookie)(res, {
        id: user.id,
        role: user.role,
    });
    return { user, token };
};
exports.handleGoogleCallback = handleGoogleCallback;
const loginService = async (data, res) => {
    const { email, password_hash } = data;
    // validasi email
    const existingUser = await (0, auth_repository_1.findUserByEmail)(email);
    if (!existingUser) {
        throw new AppError_1.default("User not found", 400);
    }
    // validasi password
    const comparePassword = await (0, bcrypt_1.compare)(password_hash, existingUser.password_hash);
    if (!comparePassword) {
        throw new AppError_1.default("Invalid password", 401);
    }
    const token = (0, jwt_1.generateTokenAndSetCookie)(res, existingUser);
    const { password_hash: _, ...userWithoutPassword } = existingUser;
    return {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        role: userWithoutPassword.role,
        full_name: userWithoutPassword.full_name,
        is_verified: userWithoutPassword.is_verified,
        profile_picture: userWithoutPassword.profile_picture,
        token,
    };
};
exports.loginService = loginService;
const verifyEmailService = async (data) => {
    const { email, verify_otp } = data;
    const existingUser = await (0, auth_repository_1.findUserByEmail)(email);
    // pengecekan email
    if (!existingUser) {
        throw new AppError_1.default("User not found", 400);
    }
    // pengecekan otp
    if (existingUser.verify_otp !== verify_otp) {
        throw new AppError_1.default("Invalid verification code", 400);
    }
    // pengecekan expired otp
    if (existingUser.verify_otp_expires_at < new Date()) {
        throw new AppError_1.default("Verification code has expired", 400);
    }
    const verifyEmail = await (0, auth_repository_1.updateStatusEmail)({
        email,
        is_verified: true,
    });
    const { password_hash: _, ...userWithoutPassword } = verifyEmail;
    return userWithoutPassword;
};
exports.verifyEmailService = verifyEmailService;
const newOtpService = async (data) => {
    const { email } = data;
    const existingUser = await (0, auth_repository_1.findUserByEmail)(email);
    //   validasi email
    if (!existingUser) {
        throw new AppError_1.default("User not found", 400);
    }
    // generate otp
    const verificationOtp = (0, generateOtp_1.generatedOtp)();
    // update otp to verify email user
    const newOtpUser = await (0, auth_repository_1.createNewOtp)({
        email,
        verify_otp: verificationOtp,
        verify_otp_expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });
    await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationOtp),
    });
    const { password_hash: _, ...userWithoutPassword } = newOtpUser;
    return userWithoutPassword;
};
exports.newOtpService = newOtpService;
//# sourceMappingURL=auth.service.js.map