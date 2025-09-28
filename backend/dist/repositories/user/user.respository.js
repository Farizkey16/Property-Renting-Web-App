"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailAndFullnameById = exports.updateProfileRepository = exports.getEmailById = exports.changePasswordUser = exports.findUserById = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const findUserById = async (userId) => {
    return prisma_1.prisma.users.findUnique({
        where: { id: userId },
        include: { tenants: true },
    });
};
exports.findUserById = findUserById;
const changePasswordUser = async (userId, newPassword) => {
    return prisma_1.prisma.users.update({
        where: { id: userId },
        data: { password_hash: newPassword },
    });
};
exports.changePasswordUser = changePasswordUser;
const getEmailById = async (userId) => {
    console.log("Looking for user:", userId);
    const user = await prisma_1.prisma.users.findUnique({
        where: { id: userId },
        select: { email: true },
    });
    console.log("DB result:", user);
    return user?.email;
};
exports.getEmailById = getEmailById;
const updateProfileRepository = async (data, userId) => {
    const user = await prisma_1.prisma.users.update({
        where: {
            id: userId,
        },
        data,
    });
};
exports.updateProfileRepository = updateProfileRepository;
const getEmailAndFullnameById = async (userId) => {
    const user = await prisma_1.prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            email: true,
            full_name: true,
        },
    });
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    return {
        email: user?.email,
        fullname: user?.full_name,
    };
};
exports.getEmailAndFullnameById = getEmailAndFullnameById;
//# sourceMappingURL=user.respository.js.map