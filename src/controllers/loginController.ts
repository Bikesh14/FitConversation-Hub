// controllers/loginController.ts
import { Request, Response } from "express";
import passport from "passport";
const initializePassport = require("../auth/passportConfig");
initializePassport(passport);

export const loginController = {
  getLoginPage(req: Request, res: Response) {
    res.render("login");
  },

  // login() {
  //   passport.authenticate("local", {
  //     successRedirect: "/user/dashboard",
  //     failureRedirect: "/user/login",
  //     failureFlash: true,
  //   });
  //   console.log("I'm here!!!!!!!!");
  // },
  login: passport.authenticate("local", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
};
