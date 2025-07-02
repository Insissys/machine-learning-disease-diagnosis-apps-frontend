import {
  activateUserService,
  createUserService,
  deleteUserService,
  fetchAllUserService,
  fetchProfileService,
} from "@/service/user";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
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
        // console.error("Failed to fetch user profile", err);
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
    paths: ["profile"],
    storage: sessionStorage,
  },
});

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchAllUsers() {
      try {
        const res = await fetchAllUserService();
        this.users = res.users || [];
      } catch (error) {
        // console.error("Failed to fetch users:", error);
        throw error;
      }
    },

    async fetchUserById(id) {
      try {
        const user = this.users.find((user) => user.id === id);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        // console.error("Failed to fetch user by ID:", error);
        throw error;
      }
    },

    async deleteUser(id) {
      try {
        await deleteUserService(id);
      } catch (error) {
        throw error;
      }
    },

    async createUser(user) {
      try {
        await createUserService(user);
      } catch (error) {
        // console.error("Failed to create user:", error);
        throw error;
      }
    },

    async activateUser(id) {
      try {
        await activateUserService({ id, isactive: true });
      } catch (error) {
        // console.error("Failed to activate user:", error);
        throw error;
      }
    },

    async deactivateUser(id) {
      try {
        await activateUserService({ id, isactive: false });
      } catch (error) {
        // console.error("Failed to deactivate user:", error);
        throw error;
      }
    },
  },
});
