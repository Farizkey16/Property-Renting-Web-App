"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiredBookings = void 0;
const prisma_1 = require("../../config/prisma");
const expiredBookings = async function (_payload, helpers) {
    try {
        const now = new Date();
        const overdueBookings = await prisma_1.prisma.bookings.findMany({
            where: {
                status: "waiting_payment",
                payment_deadline: {
                    lt: now,
                },
            },
        });
        if (overdueBookings.length === 0) {
            helpers.logger.info("No expired bookings found.");
            return;
        }
        const idstoExpire = overdueBookings.map((o) => o.id);
        // Update all bookings from ID
        await prisma_1.prisma.bookings.updateMany({
            where: {
                id: {
                    in: idstoExpire,
                },
            },
            data: {
                status: "expired",
            },
        });
        helpers.logger.info(`Successfully expired ${idstoExpire.length} overdue bookings.`);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.expiredBookings = expiredBookings;
exports.default = exports.expiredBookings;
//# sourceMappingURL=expired-booking.worker.js.map