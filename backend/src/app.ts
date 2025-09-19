import express, { Application, Response, Request, NextFunction } from "express";
import cors from "cors";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();
import AuthRouter from "./routes/auth.router";
import logger from "./utils/logger";
import UserRouter from "./routes/user.router";
import cookieParser from "cookie-parser";
import TenantRouter from "./routes/tenant.router";
import PropertyRouter from "./routes/property.router";
import RoomRouter from "./routes/room.router";
import TenantTxRouter from "./routes/tenant-tx.router";
import UserTxRouter from "./routes/user-tx.router";
import { startAllWorkersAndSchedules } from "./services/scheduler.service";
import PricingQuoteController from "./controllers/pricing/pricing.controller";
import PricingRouter from "./routes/pricing.router";
import ReviewRouter from "./routes/review.router";
import MidtransRouter from "./routes/midtrans.router";

const PORT: string | number = process.env.PORT || 4000;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.route();
    this.errorHandler();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.app.set("query parser", (str: string) => {
      return qs.parse(str, { arrayLimit: 20 });
    });
  }

  private route(): void {
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const tenantRouter = new TenantRouter();
    const propertyRouter = new PropertyRouter();
    const roomRouter = new RoomRouter();
    const tenantTxRouter = new TenantTxRouter();
    const userTxRouter = new UserTxRouter();
    const pricingRouter = new PricingRouter();
    const reviewRouter = new ReviewRouter();
    const midtransRouter = new MidtransRouter();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json("<h1> Welcome to Property Renting Web App</h1>");
    });
    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/user", userRouter.getRouter());
    this.app.use("/tenant", tenantRouter.getRouter());
    this.app.use("/property", propertyRouter.getRouter());
    this.app.use("/room", roomRouter.getRouter());
    this.app.use("/payment", tenantTxRouter.getRouter());
    this.app.use("/reservations", userTxRouter.getRouter());
    this.app.use("/pricing", pricingRouter.getRouter());
    this.app.use("/reviews", reviewRouter.getRouter());
    this.app.use("/midtrans", midtransRouter.getRouter());
  }

  // error handling
  private errorHandler(): void {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = error.statusCode || 500;
        const message =
          error.message || "An unexpected internal server error occurred.";
        // logger.error(
        //   `${req.method} ${req.path} | STATUS: ${
        //     error.message
        //   } | MESSAGE: ${JSON.stringify(error)}`
        // );
        logger.error(
          `${req.method} ${req.path} | MESSAGE: ${error.message} | STACK: ${error.stack}`
        );
        res
          .status(statusCode)
          .json({ message: message, statusCode: statusCode });
      }
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`API RUNNING AT: http://localhost:${PORT}`);
      startAllWorkersAndSchedules();
    });
  }
}

export default App;
