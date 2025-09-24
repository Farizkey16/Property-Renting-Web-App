import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  deleteRoomByIdService,
  getRoomByPropertyAndNameService,
  getRoomByPropertyAndNameServiceDetail,
  getRoomsService,
  updateRoomService,
} from "../../services/rooms/rooms.services";
import AppError from "../../errors/AppError";
import { getRoomByIdRepository } from "../../repositories/rooms/rooms.repository";
import { findTenantByUserId } from "../../repositories/tenant/tenant.repository";

class RoomsController {
  public async getRoomsController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await getRoomsService();
      res.status(200).send({ message: "Rooms found", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async getRoomByPropertyAndName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { propertyname, roomname, checkIn, checkOut } = req.query;

      if (!propertyname || !roomname) {
        throw new AppError("propertyname and roomname are required", 404);
      }

      const response = await getRoomByPropertyAndNameService(
        propertyname as string,
        roomname as string,
        checkIn ? String(checkIn) : undefined,
        checkOut ? String(checkOut) : undefined
      );

      res.status(200).send({ message: "Room found", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async getRoomByPropertyAndNameDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { propertyname, roomname } = req.query;

      if (!propertyname || !roomname) {
        throw new AppError("propertyname and roomname are required", 404);
      }

      const response = await getRoomByPropertyAndNameServiceDetail(
        propertyname as string,
        roomname as string
      );

      res.status(200).send({ message: "Room found", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async getRoomById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const response = await getRoomByIdRepository(id);

      res.status(200).send({ message: "Room found", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async createRoomController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const weekend_peak = req.body.weekend_peak
        ? {
            type: req.body.weekend_peak.type as "percentage" | "nominal",
            value: Number(req.body.weekend_peak.value),
          }
        : undefined;

      const custom_peaks = req.body.custom_peaks
        ? req.body.custom_peaks.map((p: any) => ({
            start_date: new Date(p.start_date),
            end_date: new Date(p.end_date),
            type: p.type as "percentage" | "nominal",
            value: Number(p.value),
          }))
        : [];

      const response = await createRoomService(
        req.body,
        req.files as Express.Multer.File[],
        weekend_peak,
        custom_peaks
      );
      res
        .status(200)
        .send({ message: "Room created", success: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async updateRoom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const weekend_peak = req.body.weekend_peak
        ? {
            type: req.body.weekend_peak.type as "percentage" | "nominal",
            value: Number(req.body.weekend_peak.value),
          }
        : undefined;

      const custom_peaks = req.body.custom_peaks
        ? req.body.custom_peaks.map((p: any) => ({
            start_date: new Date(p.start_date),
            end_date: new Date(p.end_date),
            type: p.type as "percentage" | "nominal",
            value: Number(p.value),
          }))
        : [];

      const response = await updateRoomService(
        id,
        req.body,
        req.files as Express.Multer.File[],
        weekend_peak,
        custom_peaks
      );

      res.status(200).send({
        message: "Room updated successfully",
        success: true,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteRoom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = res.locals.decrypt.userId;
      const tenant = await findTenantByUserId(userId);

      if (!tenant) {
        throw new AppError("Tenant not found", 404);
      }
      const id = req.params.id;

      const response = await deleteRoomByIdService(id);
      res
        .status(200)
        .send({ message: "Room deleted", success: true, response });
    } catch (error) {
      next(error);
    }
  }
}

export default RoomsController;
