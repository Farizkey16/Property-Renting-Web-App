"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = __importDefault(require("../controllers/property/property.controller"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const tenantMiddleware_1 = require("../middleware/by-role/tenantMiddleware");
const uploader_1 = require("../middleware/uploader");
const review_controller_1 = __importDefault(require("../controllers/reviews/review.controller"));
const property_1 = require("../middleware/validation/property");
class PropertyRouter {
    route;
    propertyController;
    reviewController;
    constructor() {
        this.route = (0, express_1.Router)();
        this.propertyController = new property_controller_1.default();
        this.reviewController = new review_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/create", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, (0, uploader_1.uploaderMemory)().single("main_image"), property_1.createPropertyValidation, this.propertyController.createProperty);
        this.route.get("/all", this.propertyController.getAllProperties);
        this.route.get("/:propertyId/reviews", this.reviewController.getReviews);
        this.route.get("/get/:id", this.propertyController.getPropertyById);
        this.route.get("/nearby", this.propertyController.getPropertyByLocation);
        this.route.get("/tenant", VerifyToken_1.verifyToken, this.propertyController.getPropertiesByTenantId);
        this.route.patch("/update/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, (0, uploader_1.uploaderMemory)().single("main_image"), property_1.editPropertyValidation, this.propertyController.updateProperty);
        this.route.patch("/delete/:id", VerifyToken_1.verifyToken, tenantMiddleware_1.onlyTenant, this.propertyController.deleteProperty);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = PropertyRouter;
//# sourceMappingURL=property.router.js.map