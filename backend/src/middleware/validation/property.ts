import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { PropertyCategory } from "../../../prisma/generated/client";

const validationHandling = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors?.array()[0]?.msg, 400);
  }
  next();
};

export const createPropertyValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("address")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address is required"),
  body("city").trim().isLength({ min: 2 }).withMessage("City is required"),
  body("province")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Province is required"),
  body("zip_code")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Zip code must be at least 5 characters"),
  body("latitude").notEmpty().withMessage("Latitude is required"),
  body("longitude").notEmpty().withMessage("Longitude is required"),
  body("property_category")
    .isIn(Object.values(PropertyCategory))
    .withMessage("Invalid property category"),
  body("main_image").custom((value, { req }) => {
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

export const editPropertyValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("province").trim().notEmpty().withMessage("Province is required"),
  body("zip_code").trim().notEmpty().withMessage("Zip code is required"),
  body("property_category")
    .optional()
    .isIn(Object.values(PropertyCategory))
    .withMessage("Invalid property category"),
  body("main_image")
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
