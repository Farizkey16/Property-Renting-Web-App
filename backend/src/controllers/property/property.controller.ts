import { NextFunction, Request, Response } from "express";
import {
  createPropertyServices,
  deletePropertyService,
  getAllPropertiesService,
  getPropertyByIdService,
  getPropertyByLocationServices,
  updatePropertyServices,
} from "../../services/property/property.service";
import { findTenantByUserId } from "../../repositories/tenant/tenant.repository";
import AppError from "../../errors/AppError";
import { PropertyCategory } from "../../../prisma/generated/client";
import { getTenantWithPropertiesByUserId } from "../../repositories/property/property.repository";

class PropertyController {
  public async getAllProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { property_category, name, page = "1", limit = "8" } = req.query;

    try {
      if (
        property_category &&
        !Object.values(PropertyCategory).includes(
          property_category as PropertyCategory
        )
      ) {
        throw new AppError("Invalid property category", 400);
      }

      const { data, total } = await getAllPropertiesService({
        property_category: property_category as PropertyCategory,
        name: name as string,
        page: Number(page),
        limit: Number(limit),
      });

      res.status(200).send({
        message: "Properties found",
        success: true,
        properties: data,
        total,
        page: Number(page),
        limit: Number(limit),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPropertyById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError("[getPropertyById]: Id is required.", 400);
      }

      const property = await getPropertyByIdService(id);

      res
        .status(200)
        .send({ message: "Property found", success: true, property });
    } catch (error) {
      next(error);
    }
  }

  public async getPropertiesByTenantId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const decrypt = res.locals.decrypt;
      if (!decrypt || !decrypt.userId) {
        throw new AppError("Unauthorized access", 401);
      }

      const tenantWithProperties = await getTenantWithPropertiesByUserId(
        decrypt.userId
      );

      if (!tenantWithProperties) {
        throw new AppError("Tenant not found", 404);
      }

      res.status(200).json({
        success: true,
        message: "Properties found",
        tenant: {
          id: tenantWithProperties.id,
          logo: tenantWithProperties.logo,
          company_name: tenantWithProperties.company_name,
        },
        properties: tenantWithProperties.properties,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPropertyByLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        latitude,
        longitude,
        radius,
        checkIn,
        checkOut,
        guests,
        rooms,
        category,
        minPrice,
        maxPrice,
      } = req.query;

      if (!latitude || !longitude || !radius) {
        throw new AppError("latitude, longitude, and radius are required", 400);
      }

      if (!checkIn || !checkOut) {
        throw new AppError("checkIn and checkOut are required", 400);
      }

      const rad = Number(radius) || 5;
      const lat = Number(latitude);
      const lng = Number(longitude);

      const properties = await getPropertyByLocationServices(
        lat,
        lng,
        rad,
        checkIn as string,
        checkOut as string,
        category as PropertyCategory,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined,
        guests ? Number(guests) : undefined,
        rooms ? Number(rooms) : undefined
      );

      res.status(200).send({
        message: "Properties found",
        success: true,
        radius: rad,
        user_location: { latitude: lat, longitude: lng },
        filters: {
          checkIn,
          checkOut,
          guests: guests ? Number(guests) : undefined,
          rooms: rooms ? Number(rooms) : undefined,
          category,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
        },
        properties,
      });
    } catch (error) {
      next(error);
    }
  }

  public async createProperty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = res.locals.decrypt.userId;
      const tenant = await findTenantByUserId(userId);

      if (!tenant) {
        throw new AppError("tenant not found", 404);
      }

      const property = await createPropertyServices(
        req.body,
        req.file as Express.Multer.File,
        tenant.id
      );
      res
        .status(201)
        .send({ message: "Property created", success: true, property });
    } catch (error) {
      next(error);
    }
  }

  public async updateProperty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = res.locals.decrypt.userId;
      const tenant = await findTenantByUserId(userId);

      if (!tenant) {
        throw new AppError("tenant not found", 404);
      }

      const propertyId = req.params.id;

      if (!propertyId) {
        throw new AppError("[getPropertyById]: Id is required.", 400);
      }
      const property = await updatePropertyServices(
        propertyId,
        req.body,
        req.file as Express.Multer.File,
        tenant.id
      );
      res
        .status(200)
        .send({ message: "Property updated", success: true, property });
    } catch (error) {
      next(error);
    }
  }

  public async deleteProperty(
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

      const propertyId = req.params.id;
      if (!propertyId) {
        throw new AppError("[deleteProperty]: Id is required.", 400);
      }

      await deletePropertyService(propertyId, tenant.id);

      res
        .status(200)
        .send({ message: "Property deleted (soft delete)", success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default PropertyController;
