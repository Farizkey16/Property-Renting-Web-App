import { Prisma } from "@prisma/client"
import { prisma } from "../../config/prisma"
import { Prisma as PrismaFromClient } from "../../../prisma/generated/client"


export const checkBookingAndUserId = async (bookingId: string, userId: string, tx?: Prisma.TransactionClient) => {

    const db = tx ?? prisma
    const response = await db.bookings.findFirst({
        where: {
            id: bookingId,
            user_id: userId 
        }
    })

    return response
}

export const getFilteredBookings = async (whereClause: PrismaFromClient.bookingsWhereInput, sort: any, page: number, limit: number ) => {
    const skip = (page - 1) * limit

    const [data, totalItems] = await Promise.all([
        prisma.bookings.findMany({
        where: whereClause,
        orderBy: {
          created_at: sort === "asc" ? "asc" : "desc",
        },
        take: limit,
        skip: skip,
        select: {
          id: true,
          check_in_date: true,
          check_out_date: true,
          payment_deadline: true,
          proof_image: true,
          amount: true,
          booking_rooms: {
            select: {
              id: true,
              room_id: true,
              guests_count: true,
              nights: true,
              price_per_night: true,
              subtotal: true,
              room: {
                select: {
                  name: true
                }
              }
            },
          },
          property: {
            select: {
              name: true,
              main_image: true,
              city: true,
            },
          },
          status: true,
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),

      prisma.bookings.count({
        where: whereClause
      })
    ])

    const totalPages = Math.ceil(totalItems/limit)

    return {
        data,
        meta: {
            page,
            limit,
            totalItems,
            totalPages
        }
    }
}