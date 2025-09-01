import { Router } from "express";
import UserTransactions from "../controllers/transaction/user/user-tx.controller";
import { onlyUser } from "../middleware/by-role/userMiddleware";
import { verifyToken } from "../middleware/VerifyToken";

class UserTransactionsRouter {
    private route: Router;
    private userTrx: UserTransactions;


    constructor() {
        this.route = Router();
        this.userTrx = new UserTransactions();
        this.initializeRoutes()}

        private initializeRoutes() {
            this.route.post("/create", verifyToken, onlyUser, this.userTrx.reservation),
            this.route.post("/proof", verifyToken, onlyUser, this.userTrx.paymentProofUpload)
            this.route.get("/get", verifyToken, onlyUser, this.userTrx.getReservations),
            this.route.get("/get/history", verifyToken, onlyUser, this.userTrx.getReservationsHistory)
        }

        public getRouter(): Router{
            return this.route
        }
}

export default UserTransactionsRouter
