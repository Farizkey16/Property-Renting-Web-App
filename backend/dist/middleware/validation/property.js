"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPropertyValidation = exports.createPropertyValidation = void 0;
const express_validator_1 = require("express-validator");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const client_1 = require("../../../prisma/generated/client");
const validationHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new AppError_1.default(errors?.array()[0]?.msg, 400);
    }
    next();
};
exports.createPropertyValidation = [
    (0, express_validator_1.body)("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    (0, express_validator_1.body)("description")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),
    (0, express_validator_1.body)("address")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Address is required"),
    (0, express_validator_1.body)("city").trim().isLength({ min: 2 }).withMessage("City is required"),
    (0, express_validator_1.body)("province")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Province is required"),
    (0, express_validator_1.body)("zip_code")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Zip code must be at least 5 characters"),
    (0, express_validator_1.body)("latitude").notEmpty().withMessage("Latitude is required"),
    (0, express_validator_1.body)("longitude").notEmpty().withMessage("Longitude is required"),
    (0, express_validator_1.body)("property_category")
        .isIn(Object.values(client_1.PropertyCategory))
        .withMessage("Invalid property category"),
    (0, express_validator_1.body)("main_image").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Main image is required");
        }
        if (req.file.size <= 0) {
            throw new Error("Image cannot be empty");
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error("Only jpg or png images are allowed");
        }
        return true;
    }),
    validationHandling,
];
exports.editPropertyValidation = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description").trim().notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("address").trim().notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("city").trim().notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("province").trim().notEmpty().withMessage("Province is required"),
    (0, express_validator_1.body)("zip_code").trim().notEmpty().withMessage("Zip code is required"),
    (0, express_validator_1.body)("property_category")
        .optional()
        .isIn(Object.values(client_1.PropertyCategory))
        .withMessage("Invalid property category"),
    (0, express_validator_1.body)("main_image")
        .optional()
        .custom((value, { req }) => {
        if (req.file) {
            if (req.file.size <= 0) {
                throw new Error("Image cannot be empty");
            }
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error("Only jpg or png images are allowed");
            }
        }
        return true;
    }),
    validationHandling,
];
//# sourceMappingURL=property.js.map