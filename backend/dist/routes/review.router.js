"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = __importDefault(require("../controllers/reviews/review.controller"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const tenantMiddleware_1 = require("../middleware/by-role/tenantMiddleware");
class ReviewRouter {
    route;
    reviewController;
    constructor() {
        this.route = (0, express_1.Router)();
        this.reviewController = new review_controller_1.default;
        this.initializeRoute();
    }
    initializeRoute() {
        this.route.patch("/:reviewId/reply", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.reviewController.replyReview);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = ReviewRouter;
//# sourceMappingURL=review.router.js.map