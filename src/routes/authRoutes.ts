// routes/authRoutes.ts
import express from "express";
import { loginController } from "../controllers/loginController";
import { signupController } from "../controllers/signupController";
import { logoutController } from "../controllers/logoutController";
import { dashboardController } from "../controllers/dashboardController";

const router = express.Router();

router.get("/user/login", loginController.getLoginPage);
router.post("/user/login", loginController.login);

router.get("/user/signup", signupController.getSignupPage);
router.post("/user/signup", signupController.signup);

router.get("/user/signup", logoutController.logout);

router.get("/user/dashboard", dashboardController.showDashboard);

export default router;
