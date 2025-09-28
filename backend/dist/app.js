"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const qs_1 = __importDefault(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const logger_1 = __importDefault(require("./utils/logger"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tenant_router_1 = __importDefault(require("./routes/tenant.router"));
const property_router_1 = __importDefault(require("./routes/property.router"));
const room_router_1 = __importDefault(require("./routes/room.router"));
const tenant_tx_router_1 = __importDefault(require("./routes/tenant-tx.router"));
const user_tx_router_1 = __importDefault(require("./routes/user-tx.router"));
const scheduler_service_1 = require("./services/scheduler.service");
const pricing_router_1 = __importDefault(require("./routes/pricing.router"));
const review_router_1 = __importDefault(require("./routes/review.router"));
const midtrans_router_1 = __importDefault(require("./routes/midtrans.router"));
const PORT = process.env.PORT || 4000;
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.route();
        this.errorHandler();
    }
    configure() {
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:3000",
            credentials: true,
        }));
        this.app.set("query parser", (str) => {
            return qs_1.default.parse(str, { arrayLimit: 20 });
        });
    }
    route() {
        const authRouter = new auth_router_1.default();
        const userRouter = new user_router_1.default();
        const tenantRouter = new tenant_router_1.default();
        const propertyRouter = new property_router_1.default();
        const roomRouter = new room_router_1.default();
        const tenantTxRouter = new tenant_tx_router_1.default();
        const userTxRouter = new user_tx_router_1.default();
        const pricingRouter = new pricing_router_1.default();
        const reviewRouter = new review_router_1.default();
        const midtransRouter = new midtrans_router_1.default();
        this.app.get("/", (req, res) => {
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
    errorHandler() {
        this.app.use((error, req, res, next) => {
            const statusCode = error.statusCode || 500;
            const message = error.message || "An unexpected internal server error occurred.";
            // logger.error(
            //   `${req.method} ${req.path} | STATUS: ${
            //     error.message
            //   } | MESSAGE: ${JSON.stringify(error)}`
            // );
            logger_1.default.error(`${req.method} ${req.path} | MESSAGE: ${error.message} | STACK: ${error.stack}`);
            res
                .status(statusCode)
                .json({ message: message, statusCode: statusCode });
        });
    }
    start() {
        this.app.listen(PORT, () => {
            console.log(`API RUNNING AT: http://localhost:${PORT}`);
            (0, scheduler_service_1.startAllWorkersAndSchedules)();
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map