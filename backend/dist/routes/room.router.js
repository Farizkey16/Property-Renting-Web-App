"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_controller_1 = __importDefault(require("../controllers/rooms/rooms.controller"));
const uploader_1 = require("../middleware/uploader");
const VerifyToken_1 = require("../middleware/VerifyToken");
const tenantMiddleware_1 = require("../middleware/by-role/tenantMiddleware");
const room_1 = require("../middleware/validation/room");
class RoomRouter {
    route;
    roomRouter;
    constructor() {
        this.route = (0, express_1.Router)();
        this.roomRouter = new rooms_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/all", this.roomRouter.getRoomsController);
        this.route.get("/search", this.roomRouter.getRoomByPropertyAndName);
        this.route.get("/details", this.roomRouter.getRoomByPropertyAndNameDetail);
        this.route.get("/get-date/:id", this.roomRouter.getRoomAvailability);
        this.route.get("/get/:id", this.roomRouter.getRoomById);
        this.route.post("/block/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.roomRouter.blockRoomByTenant);
        this.route.post("/unblock/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.roomRouter.unBlockRoomByTenant);
        this.route.post("/create", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, (0, uploader_1.uploaderMemory)().array("images", 3), room_1.createRoomValidation, this.roomRouter.createRoomController);
        this.route.patch("/update/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, (0, uploader_1.uploaderMemory)().array("images", 3), room_1.editRoomValidation, this.roomRouter.updateRoom);
        this.route.patch("/delete/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.roomRouter.deleteRoom);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = RoomRouter;
//# sourceMappingURL=room.router.js.map