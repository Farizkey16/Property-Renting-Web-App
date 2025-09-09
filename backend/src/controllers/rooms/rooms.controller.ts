import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  deleteRoomByIdService,
  getRoomByPropertyAndNameService,
  getRoomsService,
  updateRoomService,
} from "../../services/rooms/rooms.services";
import AppError from "../../errors/AppError";
import { getRoomByIdRepository } from "../../repositories/rooms/rooms.repository";

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

      const response = await createRoomService(
        req.body,
        req.files as Express.Multer.File[],
        weekend_peak
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

      const response = await updateRoomService(
        id,
        req.body,
        req.files as Express.Multer.File[],
        weekend_peak
      );
      res.status(200).send({
        message: "Room updated suscessfully",
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
      const { id } = req.params;
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
