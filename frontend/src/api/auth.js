import api from "./api";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/token/", {
    username,
    password,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register/", userData);

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile/");

  return response.data;
};