import api from ".";

export async function predictDiseases(symptom) {
  try {
    const res = await api.post("/predict", {
      symptoms: symptom,
    });
    return res;
  } catch (error) {
    throw error;
  }
}
