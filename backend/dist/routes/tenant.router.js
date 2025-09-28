"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_controller_1 = __importDefault(require("../controllers/tenant/tenant.controller"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const uploader_1 = require("../middleware/uploader");
const tenant_report_controller_1 = __importDefault(require("../controllers/tenant-report/tenant-report.controller"));
const tenant_1 = require("../middleware/validation/tenant");
class TenantRouter {
    route;
    tenantController;
    salesReport;
    constructor() {
        this.route = (0, express_1.Router)();
        this.tenantController = new tenant_controller_1.default();
        this.salesReport = new tenant_report_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/register", (0, uploader_1.uploaderMemory)().single("logo"), tenant_1.registerTenantValidation, this.tenantController.registerTenant);
        this.route.patch("/update", VerifyToken_1.verifyToken, (0, uploader_1.uploaderMemory)().single("logo"), this.tenantController.updateTenant);
        this.route.get("/sales-report", VerifyToken_1.verifyToken, this.salesReport.getSalesReport);
        this.route.get("/aggregate-report", VerifyToken_1.verifyToken, this.salesReport.getAggregate);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = TenantRouter;
//# sourceMappingURL=tenant.router.js.map