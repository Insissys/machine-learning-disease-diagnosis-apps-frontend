import {
  activateUserService,
  createUserService,
  deleteUserService,
  fetchAllUserService,
  fetchProfileService,
  fetchUsersDoctorService,
} from "@/service/user";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchProfile() {
      try {
        const res = await fetchProfileService();
        this.user = { ...res.data };
      } catch (err) {
        this.user = null;
      }
    },

    clearUser() {
      this.user = null;
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
        this.users = res.data || [];
      } catch (error) {
        throw error;
      }
    },

    async fetchUsersDoctor() {
      try {
        const res = await fetchUsersDoctorService();
        this.users = res.data || [];
      } catch (error) {
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
        throw error;
      }
    },

    async activateUser(id) {
      try {
        await activateUserService({ id, isactive: true });
      } catch (error) {
        throw error;
      }
    },

    async deactivateUser(id) {
      try {
        await activateUserService({ id, isactive: false });
      } catch (error) {
        throw error;
      }
    },
  },
});
