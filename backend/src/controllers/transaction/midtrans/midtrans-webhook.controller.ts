import { Request, Response, NextFunction } from "express";
import { snap } from "../../../config/midtrans";
import { prisma } from "../../../config/prisma";
import AppError from "../../../errors/AppError";
import crypto from "crypto";
import { scheduleReminder, sendUserBookingConfirmation } from "../../../services/transaction/transaction.service";

export class MidtransWebhookController {
  public handleNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notificationJson = req.body;

      const serverKey = process.env.MD_SERVER_KEY as string;
      const signatureKey = notificationJson.signature_key;
      const orderId = notificationJson.order_id;
      const statusCode = notificationJson.status_code;
      const grossAmount = notificationJson.gross_amount;

      const hash = crypto.createHash("sha512");
      const expectedSignature = hash
        .update(orderId + statusCode + grossAmount + serverKey)
        .digest("hex");

      if (signatureKey !== expectedSignature) {
        throw new AppError("Invalid Midtrans signature.", 403);
      }

      const transactionStatus = notificationJson.transaction_status;
      const fraudStatus = notificationJson.fraud_status;

      const booking = await prisma.bookings.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!booking) {
        console.warn(
          `Webhook received for a booking that was not found: ${orderId}`
        );
        return res
          .status(200)
          .send("Booking not found, but notification acknowledged.");
      }

      const bookingId = booking.id

      const tenantRecord = await prisma.tenants.findUnique({
        where: {
          user_id: booking.user_id
        }
      })

      if (transactionStatus === "settlement" || transactionStatus === "capture") {
        if (fraudStatus === "accept") {
          const updatedBooking = await prisma.bookings.update({
            where: {
              id: orderId,
            },
            data: {
              status: "confirmed",
              paid_at: new Date(),
            },
            include: {
              user:true,
              property: true,
              booking_rooms: {
                include: {
                  room: true
                }
              }
            }
          });

          await sendUserBookingConfirmation(updatedBooking)
          await scheduleReminder(bookingId)
        }
      } else if (
        transactionStatus === "expire" ||
        transactionStatus === "cancel" ||
        transactionStatus === "deny"
      ) {
        await prisma.bookings.update({
          where: {
            id: orderId,
          },
          data: {
            status: "canceled_by_tenant",
          },
        });
      }

      res.status(200).send("Notification received successfully.");
    } catch (error) {
      next(error);
    }
  };
}
