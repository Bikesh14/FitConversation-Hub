import express, { NextFunction, Request, Response } from "express";

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/dashboard");
  }
  next();
}

export function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}
