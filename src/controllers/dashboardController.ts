// controllers/dashboardController.ts
import { Request, Response } from "express";

export const dashboardController = {
  showDashboard(req: Request, res: Response) {
    const user = req.user;
    res.render("dashboard", { user: "Billllli" });
  },
};
