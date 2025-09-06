import { Prisma } from "@prisma/client"
import { prisma } from "../../config/prisma"


export const checkBookingAndUserId = async (bookingId: string, userId: string, tx?: Prisma.TransactionClient) => {

    const db = tx ?? prisma
    const response = await db.bookings.findFirst({
        where: {
            id: bookingId,
            userId: userId
        }
    })

    return response
}