import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  deleteRoomByIdService,
<<<<<<< HEAD
  getRoomByPropertyAndNameService,
  getRoomsService,
} from "../../services/rooms/rooms.services";
import AppError from "../../errors/AppError";
=======
  getRoomByIdService,
  getRoomsService,
} from "../../services/rooms/rooms.services";
>>>>>>> main

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

<<<<<<< HEAD
  public async getRoomByPropertyAndName(
=======
  public async getRoomByIdController(
>>>>>>> main
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
<<<<<<< HEAD
      const { propertyname, roomname } = req.query;
      if (!propertyname || !roomname) {
        throw new AppError("propertyname and roomname are required", 404);
      }
      const response = await getRoomByPropertyAndNameService(
        propertyname as string,
        roomname as string
      );

=======
      const response = await getRoomByIdService(req.params.id);
>>>>>>> main
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
<<<<<<< HEAD
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
=======
      const { property_id } = req.params;

      const response = await createRoomService(
        req.body,
        property_id,
        req.file as Express.Multer.File
>>>>>>> main
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
      // code
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
