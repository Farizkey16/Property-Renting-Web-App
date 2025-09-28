"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_tx_controller_1 = __importDefault(require("../controllers/transaction/tenant/tenant-tx.controller"));
const tenantMiddleware_1 = require("../middleware/by-role/tenantMiddleware");
const VerifyToken_1 = require("../middleware/VerifyToken");
const user_sales_report_controller_1 = __importDefault(require("../controllers/tenant-report/user-sales-report.controller"));
class TenantTransactionsRouter {
    route;
    tenantTrx;
    userSalesReport;
    constructor() {
        this.route = (0, express_1.Router)();
        this.tenantTrx = new tenant_tx_controller_1.default();
        this.userSalesReport = new user_sales_report_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/availability", VerifyToken_1.verifyToken, this.tenantTrx.getAvailability);
        this.route.get("/orders/tenant", VerifyToken_1.verifyToken, this.tenantTrx.getReservations);
        this.route.get("/room-availability", this.tenantTrx.getRoomAmountAvailable);
        this.route.get("/user/report", VerifyToken_1.verifyToken, this.userSalesReport.getUserSales);
        this.route.patch("/accept/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.tenantTrx.acceptPayment),
            this.route.patch("/reject/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.tenantTrx.rejectPayment),
            this.route.patch("/cancel/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.tenantTrx.cancelPayment),
            this.route.get("/orders", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.tenantTrx.getReservationByFilter);
        this.route.get("/orders/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.tenantTrx.getReservationById);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = TenantTransactionsRouter;
//# sourceMappingURL=tenant-tx.router.js.map