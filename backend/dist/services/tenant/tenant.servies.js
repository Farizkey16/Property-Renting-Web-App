"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTenantProfileServices = exports.registerTenantService = void 0;
const cloudinary_1 = require("../../config/cloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tenant_repository_1 = require("../../repositories/tenant/tenant.repository");
const registerTenantService = async (data, email, file) => {
    const { company_name, address, phone_number } = data;
    const user = await (0, tenant_repository_1.findTenantByEmail)(email);
    const existingTenant = await (0, tenant_repository_1.findTenantByUserId)(user.id);
    if (existingTenant) {
        throw new AppError_1.default("Tenant already exist", 400);
    }
    let uploadImage = null;
    if (file) {
        uploadImage = await (0, cloudinary_1.handleUpload)(file);
    }
    const newTenant = await (0, tenant_repository_1.createNewTenant)({
        userId: user.id,
        company_name,
        address,
        phone_number,
        logo: uploadImage?.secure_url || null,
    });
    return newTenant;
};
exports.registerTenantService = registerTenantService;
const updateTenantProfileServices = async (userId, data, file) => {
    const { company_name, address, phone_number } = data;
    const existingTenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
    if (!existingTenant) {
        throw new AppError_1.default("Tenant not found", 404);
    }
    let uploadImage = null;
    if (file) {
        uploadImage = await (0, cloudinary_1.handleUpload)(file);
    }
    const updatedTenant = await (0, tenant_repository_1.updateTenantRepository)(existingTenant.id, {
        company_name,
        address,
        phone_number,
        logo: uploadImage?.secure_url || existingTenant.logo,
    });
    return updatedTenant;
};
exports.updateTenantProfileServices = updateTenantProfileServices;
//# sourceMappingURL=tenant.servies.js.map