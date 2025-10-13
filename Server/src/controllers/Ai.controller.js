import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { CreateApiError } from "../utils/CreateApiError.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  questionAnswerPrompts,
  conceptExplainPrompt,
} from "../utils/Prompt.js";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestion = AsyncHandler(async (req, res) => {
  const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

  if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
    throw CreateApiError(
      400,
      "role, experience, topicsToFocus, numberOfQuestion all are required"
    );
  }

  const prompt = questionAnswerPrompts(
    role,
    experience,
    topicsToFocus,
    numberOfQuestions
  );

  //   const response = await ai.models.generateContent({
  //     model: "gemini-2.0-flash-lite",
  //     contents: prompt,
  //   });

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const result = await model.generateContent(prompt);

  let rawText = result?.response?.text();

  if (!rawText) {
    throw CreateApiError(500, "AI did not return any text");
  }

  const cleanedText = rawText
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();

  const data = JSON.parse(cleanedText);

  return res.json(ApiResponse(200, data, "Question generated successfully"));
});

const generateConceptExplaination = AsyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question) {
    throw CreateApiError(400, "Question is required");
  }

  const prompt = conceptExplainPrompt(question);

  // const response = await ai.models.generateContent({
  //   model: "gemini-2.0-flash-lite",
  //   contents: prompt,
  // });

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const response = await model.generateContent(prompt);

  console.log(response.text)

   let rawText = response?.response?.text();

  if (!rawText) {
    throw CreateApiError(500, "AI did not return any text");
  }

  const cleanedText = rawText
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();

  const data = JSON.parse(cleanedText);

  return res.json(ApiResponse(200, data, "Concept generated successfully"));
});

export { generateQuestion, generateConceptExplaination };
