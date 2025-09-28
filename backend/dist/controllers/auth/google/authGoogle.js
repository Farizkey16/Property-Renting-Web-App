"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = require("../../../utils/google");
const auth_service_1 = require("../../../services/auth/auth.service");
class GoogleAuthController {
    async login(req, res, next) {
        try {
            res.redirect(google_1.authUrl);
        }
        catch (error) {
            next(error);
        }
    }
    async callback(req, res, next) {
        try {
            const { code } = req.query;
            if (!code || typeof code !== "string") {
                return res.status(400).json({ message: "Missing Google code" });
            }
            const result = await (0, auth_service_1.handleGoogleCallback)(code, res);
            return res.redirect(process.env.FRONTEND_URL);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = GoogleAuthController;
//# sourceMappingURL=authGoogle.js.map