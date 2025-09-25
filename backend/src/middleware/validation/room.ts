import { body, validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import AppError from "../../errors/AppError";
import { Request } from "express";

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

export const editRoomValidation = [
  body("id").isString().withMessage("Room id is required"),
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
