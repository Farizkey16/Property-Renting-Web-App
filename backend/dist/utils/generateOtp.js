"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedOtp = void 0;
const generatedOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generatedOtp = generatedOtp;
//# sourceMappingURL=generateOtp.js.map