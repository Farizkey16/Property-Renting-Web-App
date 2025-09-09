import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { prisma } from "../../config/prisma";
import { Prisma } from "../../../prisma/generated/client";

/**
 * 1. Validate tenant role
 * 2. Fetch & validate booking based on id --> this is to accommodate aggregate sales data, basing it on amount/total_price on booking status === 'confirmed'
 * 3. Fetch & validate property based on id --> this is to accommodate aggregate sales data based on amount on property list
 * 4. Fetch & validate user based on booking (?) --> this is to accommodate aggregate sales data per user
 * 5. sorting by date and sales total
 * 6. filter by date range
 */

interface ChartData {
  labels: string[];
  data: number[];
}

interface OverviewStats {
  totalRevenue: number;
  totalVisitors: number;
  totalBookings: number;
  avgRevenuePerBooking: number;
}

class SalesReport {
  public getSalesReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals.decrypt;
      console.log("Printing user:", user.role, user.id);

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

      const tenantId = tenantRecord.id;

      const { groupBy, sortBy, startDate, endDate } = req.query;

      const whereClause: Prisma.bookingsWhereInput = {
        property: {
          tenant_id: tenantId,
        },
        status: "confirmed",
      };

      const dateFilter: Prisma.DateTimeFilter = {};

      if (startDate && typeof startDate === "string") {
        dateFilter.gte = new Date(startDate);
      }

      if (endDate && typeof endDate === "string") {
        dateFilter.lte = new Date(endDate);
      }

      if (Object.keys(dateFilter).length > 0) {
        whereClause.check_in_date = dateFilter;
      }

      let result;
      let formattedData: ChartData = {
        labels: [],
        data: [],
      };

      if (groupBy === "property") {
        const salesByProperty = await prisma.bookings.groupBy({
          by: ["property_id"],
          where: whereClause,
          _sum: {
            total_price: true,
          },
        });

        const propertyIds = salesByProperty.map((item) => item.property_id);

        const properties = await prisma.properties.findMany({
          where: { id: { in: propertyIds } },
          select: { id: true, name: true },
        });

        const propertyMap = new Map(properties.map((p) => [p.id, p.name]));

        formattedData.labels = salesByProperty.map(
          (item) => propertyMap.get(item.property_id) || "unknown property"
        );
        formattedData.data = salesByProperty.map(
          (item) => item._sum.total_price?.toNumber() || 0
        );
      } else if (groupBy === "user") {
        const salesByUser = await prisma.bookings.groupBy({
          by: ["user_id"],
          where: whereClause,
          _sum: {
            total_price: true,
          },
        });

        const userIds = salesByUser.map((item) => item.user_id);
        const users = await prisma.users.findMany({
          where: { id: { in: userIds } },
          select: { id: true, full_name: true },
        });

        const userMap = new Map(users.map((u) => [u.id, u.full_name]));

        formattedData.labels = salesByUser.map(
          (item) => userMap.get(item.user_id) || "Unknown User"
        );
        formattedData.data = salesByUser.map(
          (item) => item._sum.total_price?.toNumber() || 0
        );
      } else {
        const salesByDate = await prisma.bookings.groupBy({
          by: ["check_in_date"],
          where: whereClause,
          _sum: {
            total_price: true,
          },
        });

        formattedData.labels = salesByDate.map((item) =>
          new Date(item.check_in_date).toLocaleDateString("en-US")
        );
        formattedData.data = salesByDate.map(
          (item) => item._sum.total_price?.toNumber() || 0
        );
      }

      res.status(200).json({
        success: true,
        message: "Successfully calculate sales data.",
        data: formattedData,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAggregate = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const user = res.locals.decrypt
        const tenantRecord = await prisma.tenants.findUnique({ where: { user_id: user.userId}})
        if(!tenantRecord) throw new AppError("No tenant record.", 404)
        const tenantId = tenantRecord.id;

        const {startDate, endDate} = req.query

        const whereClause: Prisma.bookingsWhereInput = {
            property: {
                tenant_id: tenantId
            }, 
            status: "confirmed"
        }

        const [revenueTotal, bookingsTotal, visitorsTotal ] = await Promise.all([
            prisma.bookings.aggregate({
                where: whereClause,
                _sum: {
                    total_price: true
                }
            }),
            prisma.bookings.aggregate({
                where: whereClause,
                _count: { _all: true}
            }),
            prisma.bookings.aggregate({
                _count: {
                    user_id: true
                },
                where: whereClause
            })
        ])

        const totalRevenue = revenueTotal._sum.total_price?.toNumber() || 0
        const totalBookings = bookingsTotal._count._all
        const totalVisitors = visitorsTotal._count.user_id

        const avgRevenuePerBooking = totalBookings > 0 ? totalRevenue / totalVisitors : 0

        const stats: OverviewStats = {
            totalRevenue,
            totalBookings,
            totalVisitors,
            avgRevenuePerBooking: parseFloat(avgRevenuePerBooking.toFixed(2))
        }

        res.status(200).json({
            success: true,
            message: "Data fetched.",
            data: stats
        })
        

    } catch (error) {
        next(error)
    }



  }
}

export default SalesReport;

