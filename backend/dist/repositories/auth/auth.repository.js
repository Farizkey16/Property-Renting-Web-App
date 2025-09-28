"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTenantById = exports.updateStatusEmail = exports.newOtpChangeEmailRepository = exports.createNewOtpChangePaaword = exports.createNewOtp = exports.createUserByGoogle = exports.createUser = exports.findUserByEmail = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const findUserByEmail = async (email) => {
    return prisma_1.prisma.users.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
    return prisma_1.prisma.users.create({
        data,
    });
};
exports.createUser = createUser;
const createUserByGoogle = async (data) => {
    return prisma_1.prisma.users.create({
        data: {
            full_name: data.full_name,
            email: data.email,
            profile_picture: data.profile_picture,
            is_verified: true,
            role: data.role || "user",
            password_hash: "",
        },
    });
};
exports.createUserByGoogle = createUserByGoogle;
const createNewOtp = async (data) => {
    return prisma_1.prisma.users.update({
        where: { email: data.email },
        data,
    });
};
exports.createNewOtp = createNewOtp;
const createNewOtpChangePaaword = async (userId, otp) => {
    return prisma_1.prisma.users.update({
        where: { id: userId },
        data: { reset_password_otp: otp },
    });
};
exports.createNewOtpChangePaaword = createNewOtpChangePaaword;
const newOtpChangeEmailRepository = async (data) => {
    const existingEmail = await prisma_1.prisma.users.findUnique({
        where: { email: data.email },
    });
    if (existingEmail && existingEmail.id !== data.id) {
        throw new AppError_1.default("Email already in use", 400);
    }
    return prisma_1.prisma.users.update({
        where: { id: data.id },
        data,
    });
};
exports.newOtpChangeEmailRepository = newOtpChangeEmailRepository;
const updateStatusEmail = async (data) => {
    return prisma_1.prisma.users.update({
        where: { email: data.email },
        data,
    });
};
exports.updateStatusEmail = updateStatusEmail;
const findTenantById = async (id) => {
    return prisma_1.prisma.tenants.findUnique({
        where: { user_id: id },
    });
};
exports.findTenantById = findTenantById;
//# sourceMappingURL=auth.repository.js.map