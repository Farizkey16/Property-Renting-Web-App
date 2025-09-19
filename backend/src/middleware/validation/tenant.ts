import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
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

export const registerTenantValidation = [
  body("email").trim().normalizeEmail().isEmail().withMessage("Invalid email"),

  body("company_name")
    .isLength({ min: 3 })
    .withMessage("Company name must be at least 3 characters"),

  body("address").notEmpty().withMessage("Address is required"),

  body("phone_number")
    .matches(/^[0-9]+$/)
    .withMessage("Phone number must contain only digits")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 digits"),

  body("logo").custom((value, { req }) => {
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
