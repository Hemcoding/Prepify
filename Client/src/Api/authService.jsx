import api from "./Axios";

export const login = async (credentials) => {
  console.log(credentials);

  const { data } = await api.post("/users/login", credentials);
  console.log(data);
  localStorage.setItem("accessToken", data.data.accessToken);
  return data;
};

export const forgotPassword = async (credentials) => {
  console.log(credentials);
  const { data } = await api.post("/users/forgot-password", credentials);
  return data;
};

export const resetPassword = async (token, password) => {
  console.log(token, password);
  const { data } = await api.post(`/users/reset-password/${token}`, password);
  return data;
};

export const getUser = async () => {
  const { data } = await api.get("/users/get-user");
  return data;
};
