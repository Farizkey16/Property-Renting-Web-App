import { Router } from "express";
import RoomsController from "../controllers/rooms/rooms.controller";
import { uploaderMemory } from "../middleware/uploader";
import { verifyToken } from "../middleware/VerifyToken";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import {
  createRoomValidation,
  editRoomValidation,
} from "../middleware/validation/room";

class RoomRouter {
  private route: Router;
  private roomRouter: RoomsController;

  constructor() {
    this.route = Router();
    this.roomRouter = new RoomsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/all", this.roomRouter.getRoomsController);
    this.route.get("/search", this.roomRouter.getRoomByPropertyAndName);
    this.route.get("/details", this.roomRouter.getRoomByPropertyAndNameDetail);
    this.route.get("/get-date/:id", this.roomRouter.getRoomAvailability);
    this.route.get("/get/:id", this.roomRouter.getRoomById);
    this.route.post(
      "/block/:id",
      verifyToken,
      onlyTenant,
      this.roomRouter.blockRoomByTenant
    );
    this.route.post(
      "/unblock/:id",
      verifyToken,
      onlyTenant,
      this.roomRouter.unBlockRoomByTenant
    );
    this.route.post(
      "/create",
      verifyToken,
      onlyTenant,
      uploaderMemory().array("images", 3),
      createRoomValidation,
      this.roomRouter.createRoomController
    );
    this.route.patch(
      "/update/:id",
      verifyToken,
      onlyTenant,
      uploaderMemory().array("images", 3),
      editRoomValidation,
      this.roomRouter.updateRoom
    );
    this.route.patch(
      "/delete/:id",
      verifyToken,
      onlyTenant,

      this.roomRouter.deleteRoom
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default RoomRouter;
