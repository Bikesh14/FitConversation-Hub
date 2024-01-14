// controllers/dashboardController.ts
import { Request, Response } from "express";

export const dashboardController = {
  showDashboard(req: Request, res: Response) {
    const user = req.user as { username?: string }; // Type assertion
    console.log("See here-----------", user);
    const username = user?.username || "Guest";
    res.render("dashboard", { user: username });
  },
};
