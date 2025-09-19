import { Router } from "express";
import TenantController from "../controllers/tenant/tenant.controller";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import { verifyToken } from "../middleware/VerifyToken";
import { uploaderMemory } from "../middleware/uploader";
import SalesReport from "../controllers/tenant-report/tenant-report.controller";
import { registerTenantValidation } from "../middleware/validation/tenant";

class TenantRouter {
  private route: Router;
  private tenantController: TenantController;
  private salesReport: SalesReport;

  constructor() {
    this.route = Router();
    this.tenantController = new TenantController();
    this.salesReport = new SalesReport();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post(
      "/register",
      uploaderMemory().single("logo"),
      registerTenantValidation,
      this.tenantController.registerTenant
    );
    this.route.patch(
      "/update",
      verifyToken,
      uploaderMemory().single("logo"),
      this.tenantController.updateTenant
    );
    this.route.get(
      "/sales-report",
      verifyToken,
      this.salesReport.getSalesReport
    );

    this.route.get(
      "/aggregate-report",
      verifyToken,
      this.salesReport.getAggregate
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default TenantRouter;
