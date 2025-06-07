import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const user = ref(null);

  const setToken = (value) => {
    token.value = value;
    localStorage.setItem("token", value);
  };

  const clear = () => {
    token.value = "";
    user.value = null;
    localStorage.removeItem("token");
  };

  return {
    token,
    user,
    setToken,
    clear,
  };
});

export const useChatStore = defineStore("chat", () => {
  const messages = ref([]);

  const addUserMessage = (msg) => {
    messages.value.push({
      role: "user",
      message: msg,
      timestamp: new Date(),
    });
  };

  const addSystemReply = (msg) => {
    messages.value.push({
      role: "system",
      message: msg,
      timestamp: new Date(),
    });
  };

  const resetChat = () => {
    messages.value = [];
  };

  return {
    messages,
    addUserMessage,
    addSystemReply,
    resetChat,
  };
});

export const usePatientStore = defineStore("patient", () => {
  const patient = ref({
    medicalRecord: "",
    name: "",
    birthDate: "",
    gender: "",
    symptoms: "",
    diagnosis: [],
  });

  const setPatient = (data) => {
    patient.value = { ...patient.value, ...data };
  };

  const resetPatient = () => {
    patient.value = {
      medicalRecord: "",
      name: "",
      birthDate: "",
      gender: "",
      symptoms: "",
      diagnosis: [],
    };
  };

  return {
    patient,
    setPatient,
    resetPatient,
  };
});

export const usePatientsStore = defineStore("patients", () => {
  const patients = ref([]);

  const addPatient = (patient) => {
    patients.value.push(patient);
  };

  const clearPatients = () => {
    patients.value = [];
  };

  return {
    patients,
    addPatient,
    clearPatients,
  };
});
