import { Request, Response, NextFunction } from "express";
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

export const regisValidation = [
  body("full_name")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password_hash")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be 6+ characters with uppercase, lowercase, and number"
    ),
  body("role").isIn(["user", "tenant"]).withMessage("Invalid role"),
  validationHandling,
];

export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password_hash")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 6 characters with uppercase, lowercase, and number"
    ),
  validationHandling,
];
