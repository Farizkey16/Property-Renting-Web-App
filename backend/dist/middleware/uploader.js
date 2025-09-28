"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploaderMemory = void 0;
const multer_1 = __importDefault(require("multer"));
const uploaderMemory = () => {
    return (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: 1 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
            const allowedExt = /\.(jpg|png)$/;
            const isValid = allowedExt.test(file.originalname.toLowerCase());
            if (!isValid) {
                const error = new Error("Only image files are allowed (jpg, png)");
                error.name = "EXTENSION_VALIDATION";
                return callback(error);
            }
            callback(null, true);
        },
    });
};
exports.uploaderMemory = uploaderMemory;
//# sourceMappingURL=uploader.js.map