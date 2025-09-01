import { Router } from "express";
import PropertyController from "../controllers/property/property.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { onlyTenant } from "../middleware/by-role/tenantMiddleware";
import { uploaderMemory } from "../middleware/uploader";

class PropertyRouter {
  private route: Router;
  private propertyController: PropertyController;

  constructor() {
    this.route = Router();
    this.propertyController = new PropertyController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post(
      "/create",
      verifyToken,
      onlyTenant,
      uploaderMemory().single("main_image"),
      this.propertyController.createProperty
    );
    this.route.get("/all", this.propertyController.getAllProperties);
    this.route.get("/get/:id", this.propertyController.getPropertyById);
<<<<<<< HEAD
    this.route.get("/nearby", this.propertyController.getPropertyByLocation);
    this.route.get(
      "/tenant",
      verifyToken,
      this.propertyController.getPropertiesByTenantId
    );
=======
>>>>>>> main
    this.route.patch("/update/:id", this.propertyController.updateProperty);
    this.route.delete("/delete/:id", this.propertyController.deleteProperty);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default PropertyRouter;
