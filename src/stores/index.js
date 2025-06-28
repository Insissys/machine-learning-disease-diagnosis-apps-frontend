import { defineStore } from "pinia";
import axios from "axios";
import api from "@/service";

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
  },

  persist: true,
});

export const usePatientStore = defineStore("patient", {
  state: () => ({
    patients: [],
    isLoading: false,
    error: null,
    search: "",
  }),

  getters: {
    filteredPatients: (state) => {
      return state.patients.filter((p) => {
        const keyword = state.search.toLowerCase();
        return Object.values(p).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(keyword)
        );
      });
    },
  },

  actions: {
    async fetchAllPatients() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await api.get("/api/patients");
        this.patients = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async createPatient(patientData) {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await api.post("/api/patients", patientData);
        if (Array.isArray(this.patients)) {
          this.patients.push(res.data);
        }
      } catch (err) {
        console.log("Create failed:", err);
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deletePatient(id) {
      this.isLoading = true;
      this.error = null;

      try {
        await api.delete(`/api/patients/${id}`);
        this.patients = this.patients.filter((p) => p.id !== id);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
