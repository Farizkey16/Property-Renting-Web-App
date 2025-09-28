"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midtrans_1 = require("../../../config/midtrans");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const prisma_1 = require("../../../config/prisma");
class MidtransTransaction {
    createTransaction = async (req, res, next) => {
        try {
            const user = res.locals.decrypt;
            const userId = user.userId;
            const { bookingId } = req.params;
            if (!bookingId) {
                throw new AppError_1.default("[createTransaction]: Id is required.", 400);
            }
            const booking = await prisma_1.prisma.bookings.findUnique({
                where: {
                    id: bookingId,
                },
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true
                        }
                    }
                }
            });
            if (userId !== booking?.user_id) {
                throw new AppError_1.default("You are prohibited from accessing this page.", 401);
            }
            if (!booking) {
                throw new AppError_1.default("Booking is not found.", 404);
            }
            const parameter = {
                transaction_details: {
                    order_id: bookingId,
                    gross_amount: Number(booking.total_price)
                },
                customer_details: {
                    full_name: booking.user.full_name,
                    email: booking.user.email
                }
            };
            const transaction = await midtrans_1.snap.createTransaction(parameter);
            res.status(200).json({
                success: true,
                message: "Transaction successfully created.",
                data: transaction
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = MidtransTransaction;
//# sourceMappingURL=create-transaction.controller.js.map