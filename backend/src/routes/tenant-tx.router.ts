import { Router } from "express";
import TenantTransactions from "../controllers/transaction/tenant/tenant-tx.controller";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import { verifyToken } from "../middleware/VerifyToken";
import UserSalesReport from "../controllers/tenant-report/user-sales-report.controller";

class TenantTransactionsRouter {
  private route: Router;
  private tenantTrx: TenantTransactions;
  private userSalesReport: UserSalesReport

  constructor() {
    this.route = Router();
    this.tenantTrx = new TenantTransactions();
    this.userSalesReport = new UserSalesReport();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get(
      "/availability",
      verifyToken,
      this.tenantTrx.getAvailability
    );
    this.route.get(
      "/orders/tenant",
      verifyToken,
      this.tenantTrx.getReservations
    );

    this.route.get("/room-availability", this.tenantTrx.getRoomAmountAvailable);
    this.route.get("/user/report", verifyToken, this.userSalesReport.getUserSales)

    this.route.patch(
      "/accept/:id",
      verifyToken,
      onlyTenant,
      this.tenantTrx.acceptPayment
    ),
      this.route.patch(
        "/reject/:id",
        verifyToken,
        onlyTenant,
        this.tenantTrx.rejectPayment
      ),
      this.route.patch(
        "/cancel/:id",
        verifyToken,
        onlyTenant,
        this.tenantTrx.cancelPayment
      ),
      this.route.get(
        "/orders",
        verifyToken,
        onlyTenant,
        this.tenantTrx.getReservationByFilter
      );
    this.route.get(
      "/orders/:id",
      verifyToken,
      onlyTenant,
      this.tenantTrx.getReservationById
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default TenantTransactionsRouter;
