"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = require("../../config/prisma");
class SalesReport {
    getSalesReport = async (req, res, next) => {
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
            const tenantId = tenantRecord.id;
            const { groupBy, sortBy, startDate, endDate } = req.query;
            const whereClause = {
                property: {
                    tenant_id: tenantId,
                },
                status: "confirmed",
            };
            const dateFilter = {};
            if (startDate && typeof startDate === "string") {
                dateFilter.gte = new Date(startDate);
            }
            if (endDate && typeof endDate === "string") {
                dateFilter.lte = new Date(endDate);
            }
            if (Object.keys(dateFilter).length > 0) {
                whereClause.check_in_date = dateFilter;
            }
            let result;
            let formattedData = {
                labels: [],
                data: [],
            };
            if (groupBy === "property") {
                const salesByProperty = await prisma_1.prisma.bookings.groupBy({
                    by: ["property_id"],
                    where: whereClause,
                    _sum: {
                        total_price: true,
                    },
                });
                const propertyIds = salesByProperty.map((item) => item.property_id);
                const properties = await prisma_1.prisma.properties.findMany({
                    where: { id: { in: propertyIds } },
                    select: { id: true, name: true },
                });
                const propertyMap = new Map(properties.map((p) => [p.id, p.name]));
                formattedData.labels = salesByProperty.map((item) => propertyMap.get(item.property_id) || "unknown property");
                formattedData.data = salesByProperty.map((item) => item._sum.total_price?.toNumber() || 0);
            }
            else if (groupBy === "user") {
                const salesByUser = await prisma_1.prisma.bookings.groupBy({
                    by: ["user_id"],
                    where: whereClause,
                    _sum: {
                        total_price: true,
                    },
                });
                const userIds = salesByUser.map((item) => item.user_id);
                const users = await prisma_1.prisma.users.findMany({
                    where: { id: { in: userIds } },
                    select: { id: true, full_name: true },
                });
                const userMap = new Map(users.map((u) => [u.id, u.full_name]));
                formattedData.labels = salesByUser.map((item) => userMap.get(item.user_id) || "Unknown User");
                formattedData.data = salesByUser.map((item) => item._sum.total_price?.toNumber() || 0);
            }
            else {
                const salesByDate = await prisma_1.prisma.bookings.groupBy({
                    by: ["check_in_date"],
                    where: whereClause,
                    _sum: {
                        total_price: true,
                    },
                });
                formattedData.labels = salesByDate.map((item) => new Date(item.check_in_date).toLocaleDateString("en-US"));
                formattedData.data = salesByDate.map((item) => item._sum.total_price?.toNumber() || 0);
            }
            res.status(200).json({
                success: true,
                message: "Successfully calculate sales data.",
                data: formattedData,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getAggregate = async (req, res, next) => {
        try {
            const user = res.locals.decrypt;
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: { user_id: user.userId },
            });
            if (!tenantRecord)
                throw new AppError_1.default("No tenant record.", 404);
            const tenantId = tenantRecord.id;
            const { startDate, endDate } = req.query;
            const whereClause = {
                property: {
                    tenant_id: tenantId,
                },
                status: "confirmed",
            };
            const [revenueTotal, bookingsTotal, visitorsTotal] = await Promise.all([
                prisma_1.prisma.bookings.aggregate({
                    where: whereClause,
                    _sum: {
                        total_price: true,
                    },
                }),
                prisma_1.prisma.bookings.aggregate({
                    where: whereClause,
                    _count: { _all: true },
                }),
                prisma_1.prisma.bookings.aggregate({
                    _count: {
                        user_id: true,
                    },
                    where: whereClause,
                }),
            ]);
            const totalRevenue = revenueTotal._sum.total_price?.toNumber() || 0;
            const totalBookings = bookingsTotal._count._all;
            const totalVisitors = visitorsTotal._count.user_id;
            const avgRevenuePerBooking = totalBookings > 0 ? totalRevenue / totalVisitors : 0;
            const stats = {
                totalRevenue,
                totalBookings,
                totalVisitors,
                avgRevenuePerBooking: parseFloat(avgRevenuePerBooking.toFixed(2)),
            };
            res.status(200).json({
                success: true,
                message: "Data fetched.",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = SalesReport;
//# sourceMappingURL=tenant-report.controller.js.map