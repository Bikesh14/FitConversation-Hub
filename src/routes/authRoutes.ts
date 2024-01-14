// routes/authRoutes.ts
import express from "express";
import { loginController } from "../controllers/loginController";
import { signupController } from "../controllers/signupController";
import { logoutController } from "../controllers/logoutController";
import { dashboardController } from "../controllers/dashboardController";

const router = express.Router();

router.get("/login", loginController.getLoginPage);
router.post("/login", loginController.login);

router.get("/signup", signupController.getSignupPage);
router.post("/signup", signupController.signup);

router.get("/logout", logoutController.logout);

router.get("/dashboard", dashboardController.showDashboard);

export default router;
