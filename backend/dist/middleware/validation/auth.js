"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.regisValidation = void 0;
const express_validator_1 = require("express-validator");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const validationHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new AppError_1.default(errors?.array()[0]?.msg, 400);
    }
    next();
};
exports.regisValidation = [
    (0, express_validator_1.body)("full_name")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("password_hash")
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
        .withMessage("Password must be 6+ characters with uppercase, lowercase, and number"),
    (0, express_validator_1.body)("role").isIn(["user", "tenant"]).withMessage("Invalid role"),
    validationHandling,
];
exports.loginValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("password_hash")
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
        .withMessage("Password must be at least 6 characters with uppercase, lowercase, and number"),
    validationHandling,
];
//# sourceMappingURL=auth.js.map