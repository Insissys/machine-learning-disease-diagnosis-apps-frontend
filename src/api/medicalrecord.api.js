import api from "./axios";

export async function fetchMedicalRecordService(id) {
  try {
    const res = await api.get("/patient/medicalrecord", {
      params: { id }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function patchMedicalRecordService(id, data) {
  try {
    const res = await api.patch(`/patient/medicalrecord/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
