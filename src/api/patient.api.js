import api from "./axios";

export async function fetchAllPatientsService() {
  try {
    const res = await api.get("/patients");
    return res.data;
  } catch (error) {
    throw error;
  }
}
