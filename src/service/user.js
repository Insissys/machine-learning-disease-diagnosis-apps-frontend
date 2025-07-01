import api from ".";

export async function fetchProfileService() {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    console.error(
      "Fetching profile failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}
