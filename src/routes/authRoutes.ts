// routes/authRoutes.ts
import express from "express";
import { loginController } from "../controllers/loginController";
import { signupController } from "../controllers/signupController";
import { logoutController } from "../controllers/logoutController";
import { dashboardController } from "../controllers/dashboardController";
import { checkAuthenticated, checkNotAuthenticated } from "../util/utils";

const router = express.Router();

router.get("/login", checkAuthenticated, loginController.getLoginPage);
router.post("/login", loginController.login);

router.get("/signup", checkAuthenticated, signupController.getSignupPage);
router.post("/signup", signupController.signup);

router.get("/logout", logoutController.logoutFunction);

router.get(
  "/dashboard",
  checkNotAuthenticated,
  dashboardController.showDashboard
);

export default router;
