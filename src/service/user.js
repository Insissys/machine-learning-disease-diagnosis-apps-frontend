import api from ".";

export async function fetchProfileService() {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    // console.error(
    //   "Fetching profile failed:",
    //   error.response?.data || error.message
    // );
    throw error;
  }
}

export async function fetchAllUserService() {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUsersDoctorService() {
  try {
    const res = await api.get("/users", {
      params: {
        name: "doctor",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserService(id) {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createUserService(user) {
  try {
    const res = await api.post("/users", user);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function activateUserService({ id, isactive }) {
  try {
    const res = await api.patch(`/users/activate/${id}`, { isactive });
    return res.data;
  } catch (error) {
    throw error;
  }
}
