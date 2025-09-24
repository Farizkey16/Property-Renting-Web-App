import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prisma";
import { differenceInCalendarDays } from "date-fns";
import AppError from "../../errors/AppError";

class PricingQuoteController {
  public getPriceQuote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { roomId, checkIn, checkOut, total } = req.query as {
        roomId: string;
        checkIn: string;
        checkOut: string;
        total: string;
      };

      const room = await prisma.rooms.findUnique({ where: { id: roomId } });

      if (!room) {
        throw new AppError("Room not found", 404);
      }

      const pricePerNight = Number(room.base_price);

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = differenceInCalendarDays(checkOutDate, checkInDate);

      if (nights <= 0) {
        throw new AppError("Check-out date must be after check-in date.", 400);
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
    } catch (error) {
      next(error);
    }
  };
}

export default PricingQuoteController;
