"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyTenant = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const onlyTenant = (req, res, next) => {
    const role = res.locals.decrypt.role;
    if (role !== "tenant") {
        throw new AppError_1.default("Unauthorized access, only tenant can access this route", 403);
    }
    next();
};
exports.onlyTenant = onlyTenant;
//# sourceMappingURL=tenantMiddleware.js.map