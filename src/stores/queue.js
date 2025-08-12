import { fetchAllQueueService } from "@/service/queue";
import { defineStore } from "pinia";

export const useQueueStore = defineStore("queue", {
  state: () => ({
    queue: [],
    isLoading: false,
    error: null,
    search: "",
  }),

  getters: {
    filteredQueue: (state) => {
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

      return state.queue.filter((p) => searchInObject(p));
    },
  },

  actions: {
    async fetchAllQueue(userId) {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetchAllQueueService(userId);
        this.queue = res.data.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export const useVisitedStore = defineStore("visit", {
  state: () => ({
    visited: null,
  }),

  actions: {
    setVisited(data) {
      this.visited = data;
    },

    clearVisited() {
      this.visited = null;
    },
  },

  persist: {
    paths: ["visited"],
    storage: sessionStorage,
  },
});
