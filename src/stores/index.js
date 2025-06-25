import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.error = null;
      try {
        const res = await axios.post("/api/login", { email, password });

        this.token = res.data.token;
        this.user = res.data.user;

        localStorage.setItem("token", this.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        throw err;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await axios.get("/api/me");
        this.user = res.data;
      } catch (err) {
        this.logout();
      }
    },
  },
});

export const usePatientStore = defineStore("patient", {
  state: () => ({
    patients: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAllPatients() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await axios.get("/api/patients");
        this.patients = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
