import MidtransTransaction from "../controllers/transaction/midtrans/create-transaction.controller";
import { MidtransWebhookController } from "../controllers/transaction/midtrans/midtrans-webhook.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { Router } from "express";

class MidtransRouter {
  private route: Router;
  private midtransTx: MidtransTransaction;
  private midtransWebhook: MidtransWebhookController

  constructor() {
    this.route = Router();
    this.midtransTx = new MidtransTransaction();
    this.midtransWebhook = new MidtransWebhookController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/create-transaction/:bookingId", verifyToken, this.midtransTx.createTransaction);
    this.route.post("/notification", this.midtransWebhook.handleNotification)
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default MidtransRouter
