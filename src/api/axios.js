import axios from "axios";
import { getToken, setToken, clearToken } from "@/utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 attach access token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔄 auto refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("masuk");
    
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("satu");
      

      try {
        const res = await api.post("/auth/refresh-token");
        const newToken = res.data.data.token;

        setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        clearToken();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
