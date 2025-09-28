"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    statusCode;
    success;
    message;
    constructor(message, statusCode) {
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map