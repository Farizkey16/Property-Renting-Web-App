import { Request, Response, NextFunction } from "express";
import { authUrl } from "../../../utils/google";
import { handleGoogleCallback } from "../../../services/auth/auth.service";

class GoogleAuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  }

  public async callback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      if (!code || typeof code !== "string") {
        return res.status(400).json({ message: "Missing Google code" });
      }

      const result = await handleGoogleCallback(code, res);

      return res.redirect("http://localhost:3000");
    } catch (error) {
      next(error);
    }
  }
}

export default GoogleAuthController;
