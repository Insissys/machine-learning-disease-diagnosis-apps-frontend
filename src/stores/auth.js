import { defineStore } from "pinia";
import { loginApi, registerApi, logoutApi } from "@/api";
import { setToken, clearToken, getToken } from "@/utils";
import { useProfileStore } from "./user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: getToken() || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    // 📝 REGISTER
    async register(payload) {
      await registerApi(payload);
    },

    // 🔐 LOGIN
    async login(email, password) {
      const data = await loginApi(email, password);

      // simpan token ke state + localStorage
      this.token = data.token;
      setToken(data.token);
    },

    // 🚪 LOGOUT
    async logout() {
      try {
        await logoutApi();
      } catch (err) {
        console.warn("Logout request failed (ignored)");
      }

      // clear token
      this.token = null;
      clearToken();

      // clear user profile
      const userStore = useProfileStore();
      userStore.clearUser();
    },
  },
});
