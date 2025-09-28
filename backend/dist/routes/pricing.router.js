"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pricing_controller_1 = __importDefault(require("../controllers/pricing/pricing.controller"));
class PricingRouter {
    route;
    pricingRouter;
    constructor() {
        this.route = (0, express_1.Router)();
        this.pricingRouter = new pricing_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/quote", this.pricingRouter.getPriceQuote);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = PricingRouter;
//# sourceMappingURL=pricing.router.js.map