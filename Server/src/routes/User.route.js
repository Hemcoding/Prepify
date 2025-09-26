import { Router } from "express";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUser } from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/get-user").get(verifyJWT,getUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
