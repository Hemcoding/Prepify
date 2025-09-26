import { Router } from "express";
import { generateConceptExplaination, generateQuestion } from "../controllers/Ai.controller.js";

const router = Router();

router.route("/generate-question").post(generateQuestion);
router.route("/generate-concept").post(generateConceptExplaination);


export default router;
