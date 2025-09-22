import { Router } from "express";
import TenantTransactions from "../controllers/transaction/tenant/tenant-tx.controller";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import { verifyToken } from "../middleware/VerifyToken";
import BookingReviews from "../controllers/reviews/review.controller";
import SalesReport from "../controllers/tenant-report/tenant-report.controller";

class TenantTransactionsRouter {
  private route: Router;
  private tenantTrx: TenantTransactions;

  constructor() {
    this.route = Router();
    this.tenantTrx = new TenantTransactions();

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
