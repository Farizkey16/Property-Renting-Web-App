import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";

class BookingReviews {
  public createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = res.locals.decrypt.userId;
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    await prisma.$transaction(async (tx) => {
      try {
        const booking = await tx.bookings.findUnique({
          where: {
            id: bookingId,
          },
          include: {
            reviews: true,
          },
        });

        if (!booking) throw new AppError("Booking not found.", 404);
        if (booking.user_id !== userId) throw new AppError("Forbidden", 403);
        if (booking.status !== "confirmed")
          throw new AppError("Booking not completed", 400);
        if (booking.check_out_date > new Date())
          throw new AppError("Cannot review before checkout.", 400);
        if (booking.reviews.length > 0)
          throw new AppError("Review already submitted.", 409);

        const review = await tx.reviews.create({
          data: {
            rating,
            comment,
            booking_id: bookingId,
            user_id: userId,
            property_id: booking.property_id,
          },
        });

        res.status(201).json({
          message: "Review created successfully",
          success: true,
          data: review,
        });
      } catch (error) {
        next(error);
      }
    });
  };

  public getReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { propertyId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      const [propertyData, totalReviews] = await Promise.all([
        prisma.properties.findUnique({
          where: {
            id: propertyId,
          },
          include: {
            reviews: {
              take: limit,
              skip: skip,
              orderBy: {
                created_at: "desc",
              },
              include: {
                user: {
                  select: {
                    full_name: true,
                    profile_picture: true,
                  },
                },
              },
            },
          },
        }),

        prisma.reviews.count({
          where: { property_id: propertyId },
        }),
      ]);

      const reviews = propertyData?.reviews || [];
      const totalPages = Math.ceil(totalReviews / limit);

      res.status(200).json({
        data: reviews,
        meta: {
          totalPages: totalPages,
          totalItems: totalReviews,
          page,
          limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public replyReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.decrypt.userId;
      const { reviewId } = req.params;
      const { reply } = req.body;

      const tenantRecord = await prisma.tenants.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!tenantRecord) {
        throw new AppError("Tenant profile not found for this user.", 404);
      }

      const review = await prisma.reviews.findFirst({
        where: {
          id: req.params.reviewId,
          property: {
            tenant_id: tenantRecord.id,
          },
        },
      });

      if (!review) throw new AppError("Review not found or unauthorized.", 404);

      const data = await prisma.reviews.update({
        where: {
          id: req.params.reviewId,
        },
        data: {
          tenant_reply: req.body.reply,
        },
      });

      res.status(200).json({
        success: true,
        message: "Reply posted successfully.",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BookingReviews;
