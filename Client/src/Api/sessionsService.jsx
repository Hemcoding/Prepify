import api from "./Axios";

export const fetchAllSessions = async () => {
  const { data } = await api.get("/sessions/my-sessions");
  return data;
};

export const createSession = async (Inputs) => {
  console.log("Inputs", Inputs);

  const { data } = await api.post("/sessions/create-session", Inputs);
  return data;
};

export const deleteSession = async (id) => {
  console.log(id)
  const { data } = await api.delete(`/sessions/delete-session/${id}`);
  return data;
};
