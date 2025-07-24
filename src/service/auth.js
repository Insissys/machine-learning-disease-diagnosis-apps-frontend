import { clearToken, setToken } from "@/utils/util";
import api from ".";
import axios from "axios";

export async function loginService(email, password) {
  try {
    const res = await axios.post("/api/auth/login", { email, password });
    const token = res.data.token;

    setToken(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    throw error;
  }
}

export async function registerService(payload) {
  try {
    const res = await axios.post("/api/auth/register", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutService() {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // console.warn(
    // "Logout failed silently:",
    // error.response?.data || error.message
    // );
  }
  clearSession();
}

export function clearSession() {
  clearToken();
  delete api.defaults.headers.common.Authorization;
}
