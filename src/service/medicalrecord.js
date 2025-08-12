import api from ".";

export async function fetchMedicalRecordService(id) {
  try {
    const res = await api.get("/patient/medicalrecord", {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function patchMedicalRecord(id, data) {
  try {
    const res = await api.patch(`/patient/medicalrecord/${id}`, data);
    return res;
  } catch (error) {
    throw error;
  }
}
