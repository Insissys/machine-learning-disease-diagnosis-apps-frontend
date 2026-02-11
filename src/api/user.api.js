import api from "./axios";

// 👤 PROFILE
export const getProfileApi = async () => {
  const res = await api.get("/users/me");
  return res.data.data;
};

// 👥 GET ALL USERS
export const getUsersApi = async () => {
  const res = await api.get("/users");
  return res.data.data;
};

// 👨‍⚕️ GET DOCTOR USERS
export const getDoctorsApi = async () => {
  const res = await api.get("/users", {
    params: { name: "doctor" },
  });
  return res.data.data;
};

// ➕ CREATE USER
export const createUserApi = async (payload) => {
  const res = await api.post("/users", payload);
  return res.data;
};

// ❌ DELETE USER
export const deleteUserApi = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// 🔄 ACTIVATE / DEACTIVATE USER
export const toggleUserActiveApi = async (id, is_active) => {
  const res = await api.patch(`/users/activate/${id}`, { is_active });
  return res.data;
};
