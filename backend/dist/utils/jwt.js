"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../errors/AppError"));
const generateTokenAndSetCookie = (res, existingUser) => {
    if (!process.env.TOKEN_KEY) {
        throw new AppError_1.default("TOKEN_KEY is not set in environment variables", 500);
    }
    const token = (0, jsonwebtoken_1.sign)({
        userId: existingUser.id,
        role: existingUser.role,
        tenantId: existingUser.tenantId
    }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
//# sourceMappingURL=jwt.js.map