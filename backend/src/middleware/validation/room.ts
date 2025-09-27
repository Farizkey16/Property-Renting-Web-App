import { body, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";
import AppError from "../../errors/AppError";

const validationHandling = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }
  next();
};

export const createRoomValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 255 })
    .withMessage("Description must be between 10 and 255 characters"),

  body("base_price")
    .isInt({ min: 0 })
    .withMessage("Base price must be an integer and >= 0"),

  body("capacity")
    .isInt({ min: 0 })
    .withMessage("Capacity must be an integer and >= 0"),

  body("total_rooms")
    .isInt({ min: 0 })
    .withMessage("Total rooms must be an integer and >= 0"),

  body("custom_peaks")
    .optional()
    .isArray()
    .withMessage("Custom peaks must be an array"),
  body("custom_peaks.*.start_date")
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("custom_peaks.*.end_date")
    .isISO8601()
    .withMessage("End date must be a valid date"),
  body("custom_peaks.*.type")
    .isIn(["nominal", "percentage"])
    .withMessage("Type must be nominal or percentage"),
  body("custom_peaks.*.value")
    .isFloat({ min: 0 })
    .withMessage("Value must be non-negative"),

  // Images: minimal 1, maksimal 3, hanya image/*
  body("images").custom((value, { req }) => {
    const files = req.files as Express.Multer.File[] | undefined;
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

export const editRoomValidation = [
  body("property_id").isString().withMessage("Property id is required"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("base_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Base price must be >= 0"),
  body("capacity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Capacity must be >= 0"),
  body("total_rooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total rooms must be >= 0"),
  validationHandling,

];

