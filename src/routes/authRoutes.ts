// routes/authRoutes.ts
import express from "express";
import { loginController } from "../controllers/loginController";
import { signupController } from "../controllers/signupController";
import { logoutController } from "../controllers/logoutController";
import { dashboardController } from "../controllers/dashboardController";
import { checkAuthenticated, checkNotAuthenticated } from "../util/utils";
import { chatController } from "../controllers/chatController";

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

router.get("/chats/:user_id_2", chatController.getChatsBetweenUsers);

router.get("/connections", chatController.getConnectedUserConnections);
export default router;
