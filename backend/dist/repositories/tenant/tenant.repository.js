"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTenantRepository = exports.createNewTenant = exports.findTenantByEmail = exports.findTenantByUserId = void 0;
const prisma_1 = require("../../config/prisma");
const findTenantByUserId = async (user_id) => {
    return prisma_1.prisma.tenants.findUnique({
        where: { user_id },
        select: { id: true, logo: true },
    });
};
exports.findTenantByUserId = findTenantByUserId;
const findTenantByEmail = async (email) => {
    return prisma_1.prisma.users.findUnique({
        where: { email },
    });
};
exports.findTenantByEmail = findTenantByEmail;
const createNewTenant = async (data) => {
    return prisma_1.prisma.tenants.create({
        data: {
            user_id: data.userId,
            company_name: data.company_name,
            address: data.address,
            phone_number: data.phone_number,
            logo: data.logo ?? null,
        },
    });
};
exports.createNewTenant = createNewTenant;
const updateTenantRepository = async (tenant_id, data) => {
    return prisma_1.prisma.tenants.update({
        where: { id: tenant_id },
        data,
    });
};
exports.updateTenantRepository = updateTenantRepository;
//# sourceMappingURL=tenant.repository.js.map