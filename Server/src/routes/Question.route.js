import { Router } from "express";
import {
  addQuestionsToSession,
  togglePinQuetion,
  updateQuestionNotes,
} from "../controllers/Quetion.controller.js";

const router = Router();

router.route("/add-questions").post(addQuestionsToSession);
router.route("/toggle-pin").post(togglePinQuetion);
router.route("/update-notes").post(updateQuestionNotes);

export default router;
