import api from "./axios";

// 👤 PROFILE
export const fetchProfileService = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// 👥 GET ALL USERS
export const fetchAllUserService = async () => {
  try {
    const res = await api.get("/users");
    return res.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const fetchDoctorsService = async () => {
  try {
    const res = await api.get("/users", {
      params: { name: "doctor" },
    });
    return res.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// ➕ CRUD
export const createUserService = async (payload) => {
  try {
    const res = await api.post("/users", payload);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteUserService = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const toggleUserActiveService = async (id, is_active) => {
  try {
    const res = await api.patch(`/users/activate/${id}`, { is_active });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
