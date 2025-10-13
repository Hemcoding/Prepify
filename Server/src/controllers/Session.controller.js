import { Question } from "../models/Question.model.js";
import { Session } from "../models/Session.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { CreateApiError } from "../utils/CreateApiError.js";

const createSession = AsyncHandler(async (req, res) => {
  const { role, experience, topicsToFocus, description, questions } = req.body;

  if (!role || !experience || !topicsToFocus || !description) {
    throw CreateApiError(
      400,
      "role, experience, topicsToFocus, description all are required"
    );
  }

  const session = await Session.create({
    user: req.user?._id,
    role,
    experience,
    topicsToFocus,
    description,
  });

  console.log("session: ", session);

  let questionIds = [];
  if (questions && Array.isArray(questions) && questions?.length > 0) {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      const question = await Question.create({
        session: session._id,
        question: q.question,
        answer: q.answer,
      });

      questionIds.push(question._id);
    }

    session.questions = questionIds;
    await session.save();
  }
  return res.json(ApiResponse(200,session, "Session created successfully"));
});

const getMySessions = AsyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user?._id })
    .sort({ createdAt: -1 })
    .populate("questions");

  if (!sessions) {
    throw CreateApiError(400, "Something went wrong");
  }

  return res.json(ApiResponse(200, sessions, "Sessions fetched successfully"));
});

const getSessionById = AsyncHandler(async (req, res) => {
  console.log(req.body.id);
  const session = await Session.findById(req.body?.id)
    .populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: -1 } },
    })
    .exec();
  console.log("session: ", session);

  if (!session) {
    throw CreateApiError(404, "Session not found");
  }

  return res.json(ApiResponse(200, session, "fetched successfully"));
});

const deleteSessions = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const session = await Session.findById(id);

  console.log(id);

  if (!session) {
    throw CreateApiError(404, "Session not found");
  }

  if (session.user.toString() !== req.user._id.toString()) {
    throw CreateApiError(401, "Not Authorized to delete this session");
  }

  await Question.deleteMany({ session: session._id });

  await session.deleteOne();

  return res.json(ApiResponse(200, "Session deleted successfully"));
});

export { createSession, getMySessions, getSessionById, deleteSessions };
