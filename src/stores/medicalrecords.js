import { fetchMedicalRecordService } from "@/service/medicalrecord";
import { defineStore } from "pinia";

export const useMedicalRecordsStore = defineStore("medicalrecords", {
  state: () => ({
    medicalrecords: null,
  }),

  actions: {
    async fetchMedicalRecords(id) {
      try {
        const res = await fetchMedicalRecordService(id);
        this.medicalrecords = res.data.data;
      } catch (error) {
        throw error;
      }
    },

    setMedicalRecords(data) {
      this.medicalrecords = data;
    },

    clearMedicalRecords() {
      this.medicalrecords = null;
    },
  },

  persist: {
    paths: ["medicalrecords"],
    storage: sessionStorage,
  },
});
