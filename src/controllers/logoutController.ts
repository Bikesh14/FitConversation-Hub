import { Request, Response } from "express";

export const logoutController = {
  logoutFunction(req: any, res: Response) {
    // req.logout();
    req.logout((err: any) => {
      if (err) {
        console.error(err);
      }
      req.flash("success_msg", "You have been logged out!");
      res.redirect("/");
    });
  },
};
