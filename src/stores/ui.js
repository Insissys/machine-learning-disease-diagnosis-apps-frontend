import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    pageLoading: false,
  }),

  actions: {
    startLoading() {
      this.pageLoading = true;
    },
    stopLoading() {
      this.pageLoading = false;
    },
  },
});
