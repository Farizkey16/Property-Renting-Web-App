import { Router } from "express";
import BookingReviews from "../controllers/reviews/review.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";


class ReviewRouter {
    private route: Router;
    private reviewController: BookingReviews

    constructor(){
        this.route = Router()
        this.reviewController = new BookingReviews
        this.initializeRoute()
    }

    private initializeRoute() {
        this.route.patch("/:reviewId/reply", verifyToken, onlyTenant, this.reviewController.replyReview)
    }

    public getRouter(): Router{
        return this.route
    }
}

export default ReviewRouter