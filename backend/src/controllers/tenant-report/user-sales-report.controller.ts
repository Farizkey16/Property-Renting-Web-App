import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { prisma } from "../../config/prisma";
import { Prisma } from "../../../prisma/generated/client";

class UserSalesReport {
  public getUserSales = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals.decrypt;
      
      if (user.role !== "tenant") {
        throw new AppError("Only tenants are authorized for access.", 403);
      }

      const tenantRecord = await prisma.tenants.findUnique({
        where: {
          user_id: user.userId,
        },
      });

      if (!tenantRecord) {
        throw new AppError("No tenant record found.", 404);
      }

      const whereClause: Prisma.bookingsWhereInput = {
        property: {
          tenant_id: tenantRecord.id,
        },
        status: "confirmed",
      };
      const customerData = await prisma.bookings.groupBy({
        by: ["user_id"],
        where: whereClause,
        _sum: {
          total_price: true,
        },
        _count: {
          id: true,
        },
        _max: {
          check_in_date: true,
        },
        orderBy: {
          _sum: {
            total_price: "desc",
          },
        },
        
      });

      const userIds = customerData.map((data) => data.user_id);
      const users = await prisma.users.findMany({
        where: {
          id: { in: userIds },
        },
        select: {
          id: true,
          full_name: true,
          email: true,
        },
      });
      const userMap = new Map(users.map((u) => [u.id, u]));

      const formattedData = customerData.map((data) => {
        const user = userMap.get(data.user_id);
        return {
          userId: data.user_id.slice(0,6).toUpperCase(),
          name: user?.full_name,
          email: user?.email,
          totalBookings: data._count.id,
          totalSpent: data._sum.total_price?.toNumber() || 0,
          lastBookingDate: data._max.check_in_date,
        };
      });

      res.status(200).json({
        success: true,
        message: "Successfully retrieved customer marketing data.",
        data: formattedData,
      });
    } catch (error) {
        next(error)
    }
  };
}

export default UserSalesReport
