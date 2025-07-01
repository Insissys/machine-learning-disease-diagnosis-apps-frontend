import { fetchProfileService } from "@/service/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      officename: "",
      address: "",
      name: "",
      email: "",
      role: "",
      expired: "",
    },
  }),

  actions: {
    async fetchProfile() {
      if (this.user.role != "") return;

      try {
        const res = await fetchProfileService();
        this.user = { ...res.user };
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        this.user = null;
      }
    },

    clearUser() {
      this.user = {
        officename: "",
        address: "",
        name: "",
        email: "",
        role: "",
        expired: "",
      };
    },
  },

  persist: {
    paths: ["user"],
    storage: sessionStorage,
  },
});
