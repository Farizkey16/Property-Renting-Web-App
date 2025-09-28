"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidtransWebhookController = void 0;
const prisma_1 = require("../../../config/prisma");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const crypto_1 = __importDefault(require("crypto"));
const transaction_service_1 = require("../../../services/transaction/transaction.service");
class MidtransWebhookController {
    handleNotification = async (req, res, next) => {
        try {
            const notificationJson = req.body;
            const serverKey = process.env.MD_SERVER_KEY;
            const signatureKey = notificationJson.signature_key;
            const orderId = notificationJson.order_id;
            const statusCode = notificationJson.status_code;
            const grossAmount = notificationJson.gross_amount;
            const hash = crypto_1.default.createHash("sha512");
            const expectedSignature = hash
                .update(orderId + statusCode + grossAmount + serverKey)
                .digest("hex");
            if (signatureKey !== expectedSignature) {
                throw new AppError_1.default("Invalid Midtrans signature.", 403);
            }
            const transactionStatus = notificationJson.transaction_status;
            const fraudStatus = notificationJson.fraud_status;
            const booking = await prisma_1.prisma.bookings.findUnique({
                where: {
                    id: orderId,
                },
            });
            if (!booking) {
                console.warn(`Webhook received for a booking that was not found: ${orderId}`);
                return res
                    .status(200)
                    .send("Booking not found, but notification acknowledged.");
            }
            const bookingId = booking.id;
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: {
                    user_id: booking.user_id
                }
            });
            if (transactionStatus === "settlement" || transactionStatus === "capture") {
                if (fraudStatus === "accept") {
                    const updatedBooking = await prisma_1.prisma.bookings.update({
                        where: {
                            id: orderId,
                        },
                        data: {
                            status: "confirmed",
                            paid_at: new Date(),
                        },
                        include: {
                            user: true,
                            property: true,
                            booking_rooms: {
                                include: {
                                    room: true
                                }
                            }
                        }
                    });
                    await (0, transaction_service_1.sendUserBookingConfirmation)(updatedBooking);
                    await (0, transaction_service_1.scheduleReminder)(bookingId);
                }
            }
            else if (transactionStatus === "expire" ||
                transactionStatus === "cancel" ||
                transactionStatus === "deny") {
                await prisma_1.prisma.bookings.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        status: "canceled_by_tenant",
                    },
                });
            }
            res.status(200).send("Notification received successfully.");
        }
        catch (error) {
            next(error);
        }
    };
}
exports.MidtransWebhookController = MidtransWebhookController;
//# sourceMappingURL=midtrans-webhook.controller.js.map