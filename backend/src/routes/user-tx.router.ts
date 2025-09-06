import { Router } from "express";
import UserTransactions from "../controllers/transaction/user/user-tx.controller";
import { onlyUser } from "../middleware/by-role/userMiddleware";
import { verifyToken } from "../middleware/VerifyToken";
import { uploaderMemory } from "../middleware/uploader";

class UserTransactionsRouter {
    private route: Router;
    private userTrx: UserTransactions;


    constructor() {
        this.route = Router();
        this.userTrx = new UserTransactions();
        this.initializeRoutes()}

        private initializeRoutes() {
            this.route.post("/create", verifyToken, onlyUser, this.userTrx.reservation),
            this.route.patch("/proof/:id", verifyToken, onlyUser, uploaderMemory().single("proof_image"), this.userTrx.paymentProofUpload)
            this.route.get("/get", verifyToken, onlyUser, this.userTrx.getReservations),
            this.route.get("/:id", verifyToken, onlyUser, this.userTrx.getReservationById)
            this.route.get("/get/history", verifyToken, onlyUser, this.userTrx.getReservationsHistory),
            this.route.patch("/cancel/:id", verifyToken, onlyUser, this.userTrx.cancelPayment)
        }

        public getRouter(): Router{
            return this.route
        }
}

export default UserTransactionsRouter
