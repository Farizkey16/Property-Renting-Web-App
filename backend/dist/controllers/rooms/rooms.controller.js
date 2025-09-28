"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_services_1 = require("../../services/rooms/rooms.services");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const rooms_repository_1 = require("../../repositories/rooms/rooms.repository");
const tenant_repository_1 = require("../../repositories/tenant/tenant.repository");
class RoomsController {
    async getRoomsController(req, res, next) {
        try {
            const response = await (0, rooms_services_1.getRoomsService)();
            res.status(200).send({ message: "Rooms found", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async getRoomByPropertyAndName(req, res, next) {
        try {
            const { propertyname, roomname, checkIn, checkOut } = req.query;
            if (!propertyname || !roomname) {
                throw new AppError_1.default("propertyname and roomname are required", 404);
            }
            const response = await (0, rooms_services_1.getRoomByPropertyAndNameService)(propertyname, roomname, checkIn ? String(checkIn) : undefined, checkOut ? String(checkOut) : undefined);
            res.status(200).send({ message: "Room found", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async getRoomByPropertyAndNameDetail(req, res, next) {
        try {
            const { propertyname, roomname } = req.query;
            if (!propertyname || !roomname) {
                throw new AppError_1.default("propertyname and roomname are required", 404);
            }
            const response = await (0, rooms_services_1.getRoomByPropertyAndNameServiceDetail)(propertyname, roomname);
            res.status(200).send({ message: "Room found", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async getRoomById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new AppError_1.default("[getRoomById]: Id is required.", 400);
            }
            const response = await (0, rooms_repository_1.getRoomByIdRepository)(id);
            res.status(200).send({ message: "Room found", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async getRoomAvailability(req, res, next) {
        try {
            const { id } = req.params;
            const { startDate, endDate } = req.query;
            if (!id) {
                throw new AppError_1.default("id is required", 400);
            }
            const availability = await (0, rooms_services_1.getRoomAvailableService)(id, startDate, endDate);
            res
                .status(200)
                .send({ message: "Room found", success: true, availability });
        }
        catch (error) {
            next(error);
        }
    }
    async createRoomController(req, res, next) {
        try {
            const weekend_peak = req.body.weekend_peak
                ? {
                    type: req.body.weekend_peak.type,
                    value: Number(req.body.weekend_peak.value),
                }
                : undefined;
            const custom_peaks = req.body.custom_peaks
                ? req.body.custom_peaks.map((p) => ({
                    start_date: new Date(p.start_date),
                    end_date: new Date(p.end_date),
                    type: p.type,
                    value: Number(p.value),
                }))
                : [];
            const response = await (0, rooms_services_1.createRoomService)(req.body, req.files, weekend_peak, custom_peaks);
            res
                .status(200)
                .send({ message: "Room created", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
    async updateRoom(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new AppError_1.default("[updateRoom]: Id is required.", 400);
            }
            const weekend_peak = req.body.weekend_peak
                ? {
                    type: req.body.weekend_peak.type,
                    value: Number(req.body.weekend_peak.value),
                }
                : undefined;
            const custom_peaks = req.body.custom_peaks
                ? req.body.custom_peaks.map((p) => ({
                    start_date: new Date(p.start_date),
                    end_date: new Date(p.end_date),
                    type: p.type,
                    value: Number(p.value),
                }))
                : [];
            const response = await (0, rooms_services_1.updateRoomService)(id, req.body, req.files, weekend_peak, custom_peaks);
            res.status(200).send({
                message: "Room updated successfully",
                success: true,
                response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async blockRoomByTenant(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("Tenant not found", 404);
            }
            const { id } = req.params;
            const { startDate, endDate } = req.query;
            if (!id) {
                throw new AppError_1.default("id is required", 400);
            }
            if (!startDate || !endDate) {
                throw new AppError_1.default("startDate and endDate are required", 400);
            }
            const result = await (0, rooms_repository_1.blockAllRoomsByTenantRepository)(id, new Date(startDate), new Date(endDate));
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async unBlockRoomByTenant(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("Tenant not found", 404);
            }
            const { id } = req.params;
            const { startDate, endDate } = req.query;
            if (!id) {
                throw new AppError_1.default("id is required", 400);
            }
            if (!startDate || !endDate) {
                throw new AppError_1.default("startDate and endDate are required", 400);
            }
            const result = await (0, rooms_repository_1.unBlockAllRoomsByTenantRepository)(id, new Date(startDate), new Date(endDate));
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteRoom(req, res, next) {
        try {
            const userId = res.locals.decrypt.userId;
            const tenant = await (0, tenant_repository_1.findTenantByUserId)(userId);
            if (!tenant) {
                throw new AppError_1.default("Tenant not found", 404);
            }
            const id = req.params.id;
            if (!id) {
                throw new AppError_1.default("[deleteRoom]: Id is required.", 400);
            }
            const response = await (0, rooms_services_1.deleteRoomByIdService)(id);
            res
                .status(200)
                .send({ message: "Room deleted", success: true, response });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = RoomsController;
//# sourceMappingURL=rooms.controller.js.map