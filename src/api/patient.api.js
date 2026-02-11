import api from "./axios";

// ================= GET ALL PATIENTS =================
export const getPatientsApi = async () => {
  try {
    const res = await api.get("/patients");
    return res.data.data; // langsung return array patients
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// ================= GET PATIENT BY ID =================
export const getPatientByIdApi = async (id) => {
  try {
    const res = await api.get(`/patients/${id}`);
    return res.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// ================= CREATE PATIENT =================
export const createPatientApi = async (payload) => {
  try {
    const res = await api.post("/patients", payload);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// ================= UPDATE PATIENT =================
export const updatePatientApi = async (id, payload) => {
  try {
    const res = await api.put(`/patients/${id}`, payload);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// ================= DELETE PATIENT =================
export const deletePatientApi = async (id) => {
  try {
    const res = await api.delete(`/patients/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
