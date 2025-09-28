"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("../../errors/AppError"));
class PricingQuoteController {
    getPriceQuote = async (req, res, next) => {
        try {
            const { roomId, checkIn, checkOut, total } = req.query;
            console.log("Received query params:", { roomId, checkIn, checkOut, total });
            const room = await prisma_1.prisma.rooms.findUnique({ where: { id: roomId } });
            if (!room) {
                throw new AppError_1.default("Room not found", 404);
            }
            const pricePerNight = Number(room.base_price);
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = (0, date_fns_1.differenceInCalendarDays)(checkOutDate, checkInDate);
            if (nights <= 0) {
                throw new AppError_1.default("Check-out date must be after check-in date.", 400);
            }
            const subtotalBasePrice = nights * pricePerNight;
            const taxesAndFees = subtotalBasePrice * 0.1;
            const subtotal = Number(total);
            const totalPrice = Number(total) + Number(taxesAndFees);
            res.status(200).json({
                nights,
                pricePerNight,
                subtotal,
                taxesAndFees,
                totalPrice,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = PricingQuoteController;
//# sourceMappingURL=pricing.controller.js.map