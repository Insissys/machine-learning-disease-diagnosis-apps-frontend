import api from "./axios";

// 🔐 LOGIN
export const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data; // { token, refresh_token }
};

// 📝 REGISTER
export const registerApi = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

// 🚪 LOGOUT
export const logoutApi = async () => {
  await api.post("/auth/logout");
};
