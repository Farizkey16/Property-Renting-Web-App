"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
class BookingReviews {
    createReview = async (req, res, next) => {
        const userId = res.locals.decrypt.userId;
        const { bookingId } = req.params;
        if (!bookingId) {
            throw new AppError_1.default("[getPropertyById]: Id is required.", 400);
        }
        const { rating, comment } = req.body;
        await prisma_1.prisma.$transaction(async (tx) => {
            try {
                const booking = await tx.bookings.findUnique({
                    where: {
                        id: bookingId,
                    },
                    include: {
                        reviews: true,
                    },
                });
                if (!booking)
                    throw new AppError_1.default("Booking not found.", 404);
                if (booking.user_id !== userId)
                    throw new AppError_1.default("Forbidden", 403);
                if (booking.status !== "confirmed")
                    throw new AppError_1.default("Booking not completed", 400);
                if (booking.check_out_date > new Date())
                    throw new AppError_1.default("Cannot review before checkout.", 400);
                if (booking.reviews.length > 0)
                    throw new AppError_1.default("Review already submitted.", 409);
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
            }
            catch (error) {
                next(error);
            }
        });
    };
    getReviews = async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 3;
            const skip = (page - 1) * limit;
            const [propertyData, totalReviews] = await Promise.all([
                prisma_1.prisma.properties.findUnique({
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
                prisma_1.prisma.reviews.count({
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
        }
        catch (error) {
            next(error);
        }
    };
    replyReview = async (req, res, next) => {
        try {
            const userId = res.locals.decrypt.userId;
            const { reviewId } = req.params;
            const { reply } = req.body;
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: {
                    user_id: userId,
                },
            });
            if (!tenantRecord) {
                throw new AppError_1.default("Tenant profile not found for this user.", 404);
            }
            const review = await prisma_1.prisma.reviews.findFirst({
                where: {
                    id: req.params.reviewId,
                    property: {
                        tenant_id: tenantRecord.id,
                    },
                },
            });
            if (!review)
                throw new AppError_1.default("Review not found or unauthorized.", 404);
            const data = await prisma_1.prisma.reviews.update({
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
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = BookingReviews;
//# sourceMappingURL=review.controller.js.map