import { defineStore } from "pinia";
import {
  fetchAllRegisterService,
  createRegistrationService,
  deleteRegistrationService
} from "@/api";

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    registrations: [],
    isLoading: false,
    error: null,
    search: "",
  }),

  getters: {
    filteredRegistrations: (state) => {
      const keyword = state.search.toLowerCase();

      const searchInObject = (obj) => {
        return Object.values(obj).some((val) => {
          if (typeof val === "string") {
            return val.toLowerCase().includes(keyword);
          }
          if (val && typeof val === "object") {
            return searchInObject(val);
          }
          return false;
        });
      };

      return state.registrations.filter((p) => searchInObject(p));
    },
  },

  actions: {
    async fetchAllRegistrations() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetchAllRegisterService();
        this.registrations = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async createRegistration(registrationData) {
      this.isLoading = true;
      this.error = null;

      try {
        await createRegistrationService(registrationData);
        return true;
      } catch (err) {
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
        await deleteRegistrationService(id);
        this.registrations = this.registrations.filter((p) => p.id !== id);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        throw err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
