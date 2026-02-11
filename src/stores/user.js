import { 
  getProfileApi,
  getUsersApi,
  getDoctorsApi,
  createUserApi,
  deleteUserApi,
  toggleUserActiveApi,
} from "@/api";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: null,
  }),

  getters: {
    role: (state) => state.user?.role?.name,
  },

  actions: {
    async fetchProfile() {
      try {
        this.user = await getProfileApi();
      } catch (err) {
        this.user = null;
        throw err;
      }
    },

    clearUser() {
      this.user = null;
    },
  },

  persist: {
    storage: sessionStorage,
    paths: ["user"],
  },
});

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    loading: false,
  }),

  actions: {
    async fetchAllUsers() {
      this.loading = true;
      try {
        this.users = await getUsersApi();
      } finally {
        this.loading = false;
      }
    },

    async fetchUsersDoctor() {
      this.loading = true;
      try {
        this.users = await getDoctorsApi();
      } finally {
        this.loading = false;
      }
    },

    getUserById(id) {
      return this.users.find((u) => u.id === id);
    },

    async createUser(payload) {
      await createUserApi(payload);
      await this.fetchAllUsers(); // refresh list 🔥
    },

    async deleteUser(id) {
      await deleteUserApi(id);
      await this.fetchAllUsers();
    },

    async activateUser(id) {
      await toggleUserActiveApi(id, true);
      await this.fetchAllUsers();
    },

    async deactivateUser(id) {
      await toggleUserActiveApi(id, false);
      await this.fetchAllUsers();
    },
  },
});