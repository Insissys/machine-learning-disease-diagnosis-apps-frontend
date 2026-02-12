import api from "./axios";

export async function fetchAllRegisterService() {
  try {
    const res = await api.get("/patient/registration");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const createRegistrationService = async (payload) => {
  try {
    const res = await api.post("/patients/registration", payload);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteRegistrationService = async (id) => {
  try {
    const res = await api.delete(`/patients/registration/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};