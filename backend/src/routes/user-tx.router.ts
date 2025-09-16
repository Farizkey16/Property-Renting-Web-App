import { Router } from "express";
import UserTransactions from "../controllers/transaction/user/user-tx.controller";
import { onlyUser } from "../middleware/by-role/userMiddleware";
import { verifyToken } from "../middleware/VerifyToken";
import { uploaderMemory } from "../middleware/uploader";
import BookingReviews from "../controllers/reviews/review.controller";

class UserTransactionsRouter {
    private route: Router;
    private userTrx: UserTransactions;
    private reviewController: BookingReviews


    constructor() {
        this.route = Router();
        this.userTrx = new UserTransactions();
        this.reviewController = new BookingReviews();
        this.initializeRoutes()}

        private initializeRoutes() {
            this.route.post("/create", verifyToken, onlyUser, this.userTrx.reservation),
            this.route.patch("/proof/:bookingId", verifyToken, onlyUser, uploaderMemory().single("proof_image"), this.userTrx.paymentProofUpload)
            this.route.post("/:bookingId/reviews", verifyToken, onlyUser, this.reviewController.createReview)
            this.route.get("/get", verifyToken, onlyUser, this.userTrx.getReservations),
            this.route.get("/:bookingId", verifyToken, onlyUser, this.userTrx.getReservationById)
            this.route.get("/get/history", verifyToken, onlyUser, this.userTrx.getReservationsHistory),
            this.route.patch("/cancel/:id", verifyToken, onlyUser, this.userTrx.cancelPayment)
        }

        public getRouter(): Router{
            return this.route
        }
}

export default UserTransactionsRouter
