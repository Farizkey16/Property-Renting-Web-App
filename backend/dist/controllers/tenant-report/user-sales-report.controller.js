"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = require("../../config/prisma");
class UserSalesReport {
    getUserSales = async (req, res, next) => {
        try {
            const user = res.locals.decrypt;
            if (user.role !== "tenant") {
                throw new AppError_1.default("Only tenants are authorized for access.", 403);
            }
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: {
                    user_id: user.userId,
                },
            });
            if (!tenantRecord) {
                throw new AppError_1.default("No tenant record found.", 404);
            }
            const whereClause = {
                property: {
                    tenant_id: tenantRecord.id,
                },
                status: "confirmed",
            };
            const customerData = await prisma_1.prisma.bookings.groupBy({
                by: ["user_id"],
                where: whereClause,
                _sum: {
                    total_price: true,
                },
                _count: {
                    id: true,
                },
                _max: {
                    check_in_date: true,
                },
                orderBy: {
                    _sum: {
                        total_price: "desc",
                    },
                },
            });
            const userIds = customerData.map((data) => data.user_id);
            const users = await prisma_1.prisma.users.findMany({
                where: {
                    id: { in: userIds },
                },
                select: {
                    id: true,
                    full_name: true,
                    email: true,
                },
            });
            const userMap = new Map(users.map((u) => [u.id, u]));
            const formattedData = customerData.map((data) => {
                const user = userMap.get(data.user_id);
                return {
                    userId: data.user_id.slice(0, 6).toUpperCase(),
                    name: user?.full_name,
                    email: user?.email,
                    totalBookings: data._count.id,
                    totalSpent: data._sum.total_price?.toNumber() || 0,
                    lastBookingDate: data._max.check_in_date,
                };
            });
            res.status(200).json({
                success: true,
                message: "Successfully retrieved customer marketing data.",
                data: formattedData,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = UserSalesReport;
//# sourceMappingURL=user-sales-report.controller.js.map