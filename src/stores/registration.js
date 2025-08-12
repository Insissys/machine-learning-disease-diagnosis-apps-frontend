import api from "@/service";
import { defineStore } from "pinia";

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    registrations: [],
    isLoading: false,
    error: null,
    search: "",
  }),

  getters: {
    filteredRegistrations: (state) => {
      return state.registrations.filter((p) => {
        const keyword = state.search.toLowerCase();
        return Object.values(p).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(keyword)
        );
      });
    },
  },

  actions: {
    async fetchAllRegistrations() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await api.get("/patient/registration");
        this.registrations = res.data.data;
      } catch (err) {
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async createRegistration(registrationData) {
      this.isLoading = true;
      this.error = null;

      try {
        await api.post("/patient/registration", registrationData);
        return true;
      } catch (err) {
        // console.log("Create failed:", err);
        this.error = err.response?.data?.message || err.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteRegistration(id) {
      this.isLoading = true;
      this.error = null;

      try {
        await api.delete(`/patient/registration/${id}`);
        this.registrations = this.registrations.filter((p) => p.id !== id);
      } catch (err) {
        throw err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
