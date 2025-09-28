"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_tx_controller_1 = __importDefault(require("../controllers/transaction/user/user-tx.controller"));
const userMiddleware_1 = require("../middleware/by-role/userMiddleware");
const VerifyToken_1 = require("../middleware/VerifyToken");
const uploader_1 = require("../middleware/uploader");
const review_controller_1 = __importDefault(require("../controllers/reviews/review.controller"));
class UserTransactionsRouter {
    route;
    userTrx;
    reviewController;
    constructor() {
        this.route = (0, express_1.Router)();
        this.userTrx = new user_tx_controller_1.default();
        this.reviewController = new review_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/create", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.userTrx.createBooking),
            this.route.patch("/proof/:bookingId", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, (0, uploader_1.uploaderMemory)().single("proof_image"), this.userTrx.paymentProofUpload);
        this.route.post("/:bookingId/reviews", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.reviewController.createReview),
            this.route.get("/get", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.userTrx.getReservations),
            this.route.get("/:bookingId", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.userTrx.getReservationById),
            this.route.get("/get/history", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.userTrx.getReservationsHistory),
            this.route.patch("/cancel/:id", VerifyToken_1.verifyToken, userMiddleware_1.onlyUser, this.userTrx.cancelPayment);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = UserTransactionsRouter;
//# sourceMappingURL=user-tx.router.js.map