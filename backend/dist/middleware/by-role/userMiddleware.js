"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyUser = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const onlyUser = (req, res, next) => {
    const role = res.locals.decrypt.role;
    if (role !== "user") {
        throw new AppError_1.default("Unauthorized access, only user can access this route", 403);
    }
    next();
};
exports.onlyUser = onlyUser;
//# sourceMappingURL=userMiddleware.js.map