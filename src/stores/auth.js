import { loginService, logoutService, registerService } from "@/service/auth";
import { defineStore } from "pinia";
import { useProfileStore } from "./user";

export const useAuthStore = defineStore("auth", {
  actions: {
    async register(payload) {
      try {
        await registerService(payload);
      } catch (error) {
        // console.error("Register error from store:", error);
        throw error;
      }
    },

    async login(email, password) {
      try {
        await loginService(email, password);
      } catch (error) {
        // console.error("Login error from store:", error);
        throw error;
      }
    },

    async logout() {
      try {
        await logoutService();
      } catch (error) {
        // console.error("Logout error from store:", error);
        throw error;
      }
    },
  },
});
