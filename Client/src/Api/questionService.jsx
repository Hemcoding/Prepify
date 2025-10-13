import api from "./Axios";

export const pinQuestion = async (Inputs) => {
  try {
    console.log("Inputs for pin toggle: ", Inputs);
    const { data } = await api.post("/questions/toggle-pin", Inputs);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const questionAddtoSession = async (Inputs) => {
  try {
    console.log("Inputs for question generate: ", Inputs);
    const { data } = await api.post("/questions/add-questions", Inputs);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



