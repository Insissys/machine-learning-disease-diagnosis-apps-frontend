import api from "./axios";

export async function fetchAllQueueService(userId) {
  try {
    const res = await api.get("/patient/queue", {
      params: {
        userId: userId,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}