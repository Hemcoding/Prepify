import api from "./Axios"

export const generateQuestions = async (Inputs) => {
  try {
    console.log("Inputs for question generate: ", Inputs);
    const { data } = await api.post("/ai/generate-question", Inputs);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateExplanation = async (Inputs) => {
  try {
    console.log("Inputs for generate concept: ", Inputs);
    const { data } = await api.post("/ai/generate-concept", Inputs);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};