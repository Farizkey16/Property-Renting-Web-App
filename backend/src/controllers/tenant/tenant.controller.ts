import { NextFunction, Request, Response } from "express";
import {
  registerTenantService,
  updateTenantProfileServices,
} from "../../services/tenant/tenant.servies";
import AppError from "../../errors/AppError";

class TenantController {
  public async registerTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      await registerTenantService(
        req.body,
        email,
        req.file as Express.Multer.File
      );
      res.status(201).send({ message: "Tenant registered", success: true });
    } catch (error) {
      next(error);
    }
  }

  public async updateTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const decrypt = res.locals.decrypt;
      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }
      const userId = decrypt.userId;
      const response = await updateTenantProfileServices(
        userId,
        req.body,
        req.file as Express.Multer.File
      );

      res.send({ message: "tenant profile updated", success: true, response });
    } catch (error) {
      next(error);
    }
  }
  
}

export default TenantController;
