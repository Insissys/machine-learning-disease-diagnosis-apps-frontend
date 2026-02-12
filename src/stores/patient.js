import { defineStore } from "pinia";
import {
  fetchAllPatientsService,
  getPatientByIdApi,
  createPatientApi,
  updatePatientApi,
  deletePatientApi,
} from "@/api/patient.api";

export const usePatientStore = defineStore("patient", {
  state: () => ({
    patients: [],
    selectedPatient: null,
    isLoading: false,
    error: null,
    search: "",
  }),

  // 🔎 SEARCH FILTER
  getters: {
    filteredPatients: (state) => {
      if (!state.search) return state.patients;

      const keyword = state.search.toLowerCase();
      return state.patients.filter((p) =>
        Object.values(p).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(keyword)
        )
      );
    },
  },

  actions: {
    // ================= FETCH ALL =================
    async fetchAllPatients() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetchAllPatientsService();
        this.patients = res.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    // ================= FETCH BY ID =================
    async fetchPatientById(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await getPatientByIdApi(id);
        this.selectedPatient = res.data.data;
        return res.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    // ================= CREATE =================
    async createPatient(payload) {
      this.isLoading = true;
      this.error = null;

      try {
        await createPatientApi(payload);
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // ================= UPDATE =================
    async updatePatient(payload) {
      this.isLoading = true;
      this.error = null;

      try {
        await updatePatientApi(payload.id, payload);
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // ================= DELETE =================
    async deletePatient(id) {
      this.isLoading = true;
      this.error = null;

      try {
        await deletePatientApi(id);

        // remove from state (optimistic update 🔥)
        this.patients = this.patients.filter(p => p.id !== id);

        return true;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
