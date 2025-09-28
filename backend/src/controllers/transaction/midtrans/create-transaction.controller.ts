import { snap } from "../../../config/midtrans";
import { Request, Response, NextFunction } from "express";
import AppError from "../../../errors/AppError";
import { prisma } from "../../../config/prisma";

class MidtransTransaction {
  public createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals.decrypt;
      const userId = user.userId;
      const { bookingId } = req.params;

      if (!bookingId) {
        throw new AppError("[createTransaction]: Id is required.", 400);
      }

      const booking = await prisma.bookings.findUnique({
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

      if (userId !== booking?.user_id ) {
        throw new AppError("You are prohibited from accessing this page.", 401);
      }

       if (!booking) {
        throw new AppError("Booking is not found.", 404);
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
      }

      const transaction = await snap.createTransaction(parameter)

      res.status(200).json({
        success:true,
        message:"Transaction successfully created.",
        data: transaction
      })

     
    } catch (error) {
        next(error)
    }
  };
}

export default MidtransTransaction
