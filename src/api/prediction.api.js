import api from "./axios";

export async function predictDiseasesService(symptoms) {
  try {
    const res = await api.post("/predict", {
      symptoms
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
