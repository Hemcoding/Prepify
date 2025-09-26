const questionAnswerPrompts = ( role, experience, topicsToFocus, numberOfQuestions ) => (`
    You are an AI assistant designed to help users prepare for job interviews.
    Task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus} interview questions.
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed answer.
    - if the answer needs code examples, add a small code block inside.
    - keep formatting very clean.
    - return a pure JSON array like this:
    [
        {
            "question": "question here?",
            "answer": "answer here."
        },
        ...
    ]
    Important : Do not add any extra text. only return valid JSON.
    `);

const conceptExplainPrompt = (question) => (`
    You are an AI trained to generate explanations for a given interview question.

    Task:

    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return a pure JSON object like this:
    {
        "title": "short title here."
        "explanation": "explanation here.",
    }

    Important: Do not add any extra text. Only return valid JSON.
    `);

export { questionAnswerPrompts, conceptExplainPrompt };