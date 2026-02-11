import api from "./axios";

export async function fetchAllRegisterService(userId) {
  try {
    const res = await api.get("/patient/registration");
    return res.data;
  } catch (error) {
    throw error;
  }
}