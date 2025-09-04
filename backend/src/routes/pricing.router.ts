import { Router } from "express";
import PricingQuoteController from "../controllers/pricing/pricing.controller";

class PricingRouter {
  private route: Router;
  private pricingRouter: PricingQuoteController

  constructor() {
    this.route = Router();
    this.pricingRouter = new PricingQuoteController()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/quote", this.pricingRouter.getPriceQuote);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default PricingRouter;
