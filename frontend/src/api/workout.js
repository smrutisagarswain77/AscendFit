import api from "./api";

export const getWorkouts = async () => {
  const response = await api.get("/workouts/");

  return response.data;
};

export const createWorkout = async (data) => {
  const response = await api.post("/workouts/", data);

  return response.data;
};

export const updateWorkout = async (id, data) => {
  const response = await api.put(`/workouts/${id}/`, data);

  return response.data;
};

export const deleteWorkout = async (id) => {
  return api.delete(`/workouts/${id}/`);
};