import api from "./axios";

// 👤 PROFILE
export const fetchProfileService = async () => {
  const res = await api.get("/users/me");
  return res.data.data;
};

// 👥 GET ALL USERS
export const fetchAllUserService = async () => {
  const res = await api.get("/users");
  return res.data.data;
};

export const fetchDoctorsService = async () => {
  const res = await api.get("/users", {
    params: { name: "doctor" },
  });
  return res.data.data;
};

// ➕ CRUD
export const createUserService = async (payload) => {
  const res = await api.post("/users", payload);
  return res.data;
};

export const deleteUserService = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const toggleUserActiveService = async (id, is_active) => {
  const res = await api.patch(`/users/activate/${id}`, { is_active });
  return res.data;
};
