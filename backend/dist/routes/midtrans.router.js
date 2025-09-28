"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_transaction_controller_1 = __importDefault(require("../controllers/transaction/midtrans/create-transaction.controller"));
const midtrans_webhook_controller_1 = require("../controllers/transaction/midtrans/midtrans-webhook.controller");
const VerifyToken_1 = require("../middleware/VerifyToken");
const express_1 = require("express");
class MidtransRouter {
    route;
    midtransTx;
    midtransWebhook;
    constructor() {
        this.route = (0, express_1.Router)();
        this.midtransTx = new create_transaction_controller_1.default();
        this.midtransWebhook = new midtrans_webhook_controller_1.MidtransWebhookController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/create-transaction/:bookingId", VerifyToken_1.verifyToken, this.midtransTx.createTransaction);
        this.route.post("/notification", this.midtransWebhook.handleNotification);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = MidtransRouter;
//# sourceMappingURL=midtrans.router.js.map