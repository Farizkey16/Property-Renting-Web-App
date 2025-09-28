"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTenantValidation = void 0;
const express_validator_1 = require("express-validator");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const validationHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new AppError_1.default(errors?.array()[0]?.msg, 400);
    }
    next();
};
exports.registerTenantValidation = [
    (0, express_validator_1.body)("email").trim().normalizeEmail().isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("company_name")
        .isLength({ min: 3 })
        .withMessage("Company name must be at least 3 characters"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("phone_number")
        .matches(/^[0-9]+$/)
        .withMessage("Phone number must contain only digits")
        .isLength({ min: 10 })
        .withMessage("Phone number must be at least 10 digits"),
    (0, express_validator_1.body)("logo").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Logo is required");
        }
        if (req.file.size <= 0) {
            throw new Error("Logo file cannot be empty");
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error("Logo must be a valid image (jpg, png, jpg)");
        }
        return true;
    }),
    validationHandling,
];
//# sourceMappingURL=tenant.js.map