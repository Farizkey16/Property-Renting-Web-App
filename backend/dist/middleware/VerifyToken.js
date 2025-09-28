"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    try {
        if (!process.env.TOKEN_KEY) {
            throw new AppError_1.default("TOKEN_KEY is not set", 500);
        }
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;
        console.log("Authorization Header:", authHeader);
        console.log("Cookie Token:", cookieToken);
        const token = authHeader?.split(" ")[1] || cookieToken;
        if (!token) {
            throw new AppError_1.default("Token not found", 401);
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY);
        res.locals.decrypt = decoded;
        next();
    }
    catch (error) {
        console.error("VerifyToken Error:", error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            next(new AppError_1.default("Token expired", 401));
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            next(new AppError_1.default("Invalid token", 401));
        }
        else {
            next(new AppError_1.default("Unauthorized", 401));
        }
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=VerifyToken.js.map