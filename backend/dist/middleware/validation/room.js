"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRoomValidation = exports.createRoomValidation = void 0;
const express_validator_1 = require("express-validator");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const validationHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new AppError_1.default(errors?.array()[0]?.msg, 400);
    }
    next();
};
exports.createRoomValidation = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 10, max: 255 })
        .withMessage("Description must be between 10 and 255 characters"),
    (0, express_validator_1.body)("base_price")
        .isInt({ min: 0 })
        .withMessage("Base price must be an integer and >= 0"),
    (0, express_validator_1.body)("capacity")
        .isInt({ min: 0 })
        .withMessage("Capacity must be an integer and >= 0"),
    (0, express_validator_1.body)("total_rooms")
        .isInt({ min: 0 })
        .withMessage("Total rooms must be an integer and >= 0"),
    (0, express_validator_1.body)("custom_peaks")
        .optional()
        .isArray()
        .withMessage("Custom peaks must be an array"),
    (0, express_validator_1.body)("custom_peaks.*.start_date")
        .isISO8601()
        .withMessage("Start date must be a valid date"),
    (0, express_validator_1.body)("custom_peaks.*.end_date")
        .isISO8601()
        .withMessage("End date must be a valid date"),
    (0, express_validator_1.body)("custom_peaks.*.type")
        .isIn(["nominal", "percentage"])
        .withMessage("Type must be nominal or percentage"),
    (0, express_validator_1.body)("custom_peaks.*.value")
        .isFloat({ min: 0 })
        .withMessage("Value must be non-negative"),
    // Images: minimal 1, maksimal 3, hanya image/*
    (0, express_validator_1.body)("images").custom((value, { req }) => {
        const files = req.files;
        if (!files || files.length === 0) {
            throw new Error("At least 1 image is required");
        }
        if (files.length > 3) {
            throw new Error("Maximum 3 images allowed");
        }
        for (let f of files) {
            if (!f.mimetype.startsWith("image/")) {
                throw new Error("Only image files are allowed");
            }
        }
        return true;
    }),
    validationHandling,
];
exports.editRoomValidation = [
    (0, express_validator_1.body)("property_id").isString().withMessage("Property id is required"),
    (0, express_validator_1.body)("name").optional().isString().withMessage("Name must be a string"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    (0, express_validator_1.body)("base_price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Base price must be >= 0"),
    (0, express_validator_1.body)("capacity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Capacity must be >= 0"),
    (0, express_validator_1.body)("total_rooms")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Total rooms must be >= 0"),
    validationHandling,
];
//# sourceMappingURL=room.js.map