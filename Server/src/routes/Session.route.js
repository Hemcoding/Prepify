import { Router } from "express";
import { createSession, deleteSessions, getMySessions, getSessionById } from "../controllers/Session.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-session").post(verifyJWT ,createSession);
router.route("/my-sessions").get(verifyJWT, getMySessions);
router.route("/delete-session/:id").delete(verifyJWT, deleteSessions);
router.route("/get-session").post(getSessionById);

export default router;
