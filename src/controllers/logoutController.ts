// controllers/logoutController.ts
import { Request, Response } from "express";

export const logoutController = {
  logout(req: Request, res: Response) {
    // req.logout();
    res.redirect("/");
  },
};
