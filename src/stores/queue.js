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
      return state.queue.filter((p) => {
        const keyword = state.search.toLowerCase();
        return Object.values(p).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(keyword)
        );
      });
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
