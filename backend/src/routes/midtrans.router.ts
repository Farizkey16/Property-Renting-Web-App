import MidtransTransaction from "../controllers/transaction/midtrans/create-transaction.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { Router } from "express";

class MidtransRouter {
  private route: Router;
  private midtransTx: MidtransTransaction;

  constructor() {
    this.route = Router();
    this.midtransTx = new MidtransTransaction();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/create-transaction/:bookingId", verifyToken, this.midtransTx.createTransaction);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default MidtransRouter
