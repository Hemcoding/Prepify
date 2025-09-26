import { Question } from "../models/Question.model.js";
import { Session } from "../models/Session.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { CreateApiError } from "../utils/CreateApiError.js";

const addQuestionsToSession = AsyncHandler(async(req, res) => {
    const { sessionId, questions } = req.body;

    if(!sessionId || !questions || !Array.isArray(questions)) {
        throw CreateApiError(400, "Invalid data")
    }

    const session = await Session.findById(sessionId)

    if(!session) {
        throw CreateApiError(404, "Session not fround")
    }

    const createdQuestions = await Question.insertMany(
        questions.map(q => ({
            session: sessionId,
            question: q.question,
            answer: q.answer,
        }))
    )

    session.questions.push(...createdQuestions.map(q._id));
    await session.save()

    return res.json(ApiResponse(200,createdQuestions, "Questions created successfully"))
})

const togglePinQuetion = AsyncHandler(async(req, res) => {
    const question = await Question.findById(req.body?._id);

    if(!question){
        throw CreateApiError(400, "Question not found")
    }

    question.inPinned = !question.inPinned;
    await question.save();

    return res.json(ApiResponse(200, question, "Question pinned successfully"))
})

const updateQuestionNotes = AsyncHandler(async(req, res) => {
    const {note} = req.body;
    const question = await Question.findById(req.body?.id)

    if(!question) {
        throw CreateApiError(400, "Question not found")
    }

    question.note = note || "";
    await question.save();

    return res.json(ApiResponse(200,question, "Note updated successfully"))
})

export {addQuestionsToSession, togglePinQuetion, updateQuestionNotes}