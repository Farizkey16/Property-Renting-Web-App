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
    const allowedOrigins = [
      "http://localhost:3000", // local development
      "https://property-renting-web-app.vercel.app", // production
    ];
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
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
        logger.error(
          `${req.method} ${req.path} ${error.message} ${JSON.stringify(error)}`
        );
        res.status(error.rc || 500).send(error);
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
