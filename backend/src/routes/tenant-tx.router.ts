import { Router } from "express";
import TenantTransactions from "../controllers/transaction/tenant/tenant-tx.controller";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import { verifyToken } from "../middleware/VerifyToken";

class TenantTransactionsRouter {
    private route: Router;
    private tenantTrx: TenantTransactions;

    constructor() {
        this.route = Router();
        this.tenantTrx = new TenantTransactions();
        this.initializeRoutes()}

        private initializeRoutes() {
            this.route.post("/accept/:id", verifyToken, onlyTenant, this.tenantTrx.acceptPayment),
            this.route.post("/reject/:id", verifyToken, onlyTenant, this.tenantTrx.rejectPayment),
            this.route.patch("/cancel/:id", verifyToken, onlyTenant, this.tenantTrx.cancelPayment),
            this.route.get("/orders", verifyToken, onlyTenant, this.tenantTrx.getReservation)
            this.route.get("/orders/:id", verifyToken, onlyTenant, this.tenantTrx.getReservationById)
        }

        public getRouter(): Router{
            return this.route
        }
    
}

export default TenantTransactionsRouter