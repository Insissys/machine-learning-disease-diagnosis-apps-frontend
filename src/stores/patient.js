import api from "@/service";
import { defineStore } from "pinia";

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
        const res = await api.get("/patients");
        this.patients = res.data.data;
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
        await api.post("/patients", patientData);
        return true;
      } catch (err) {
        // console.log("Create failed:", err);
        this.error = err.response?.data?.message || err.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deletePatient(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.delete(`/patients/${id}`);
        return response;
      } catch (err) {
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
