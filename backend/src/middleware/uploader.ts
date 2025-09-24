import { Request } from "express";
import multer from "multer";

export const uploaderMemory = () => {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req: Request, file: Express.Multer.File, callback) => {
      const allowedExt = /\.(jpg|png)$/;

      const isValid = allowedExt.test(file.originalname.toLowerCase());

      if (!isValid) {
        const error = new Error(
          "Only image files are allowed (jpg, png)"
        );
        error.name = "EXTENSION_VALIDATION";
        return callback(error);
      }

      callback(null, true);
    },
  });
};
