"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_servies_1 = require("../../services/tenant/tenant.servies");
const AppError_1 = __importDefault(require("../../errors/AppError"));
class TenantController {
    async registerTenant(req, res, next) {
        try {
            const { email } = req.body;
            await (0, tenant_servies_1.registerTenantService)(req.body, email, req.file);
            res.status(201).send({ message: "Tenant registered", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async updateTenant(req, res, next) {
        try {
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            const response = await (0, tenant_servies_1.updateTenantProfileServices)(userId, req.body, req.file);
            res.send({ message: "tenant profile updated", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TenantController;
//# sourceMappingURL=tenant.controller.js.map