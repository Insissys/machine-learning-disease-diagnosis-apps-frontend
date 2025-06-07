<template>
  <Patient ref="modalPatient" />
  <div class="flex flex-col items-center justify-center text-center text-base-content h-full py-64 px-4">
    <h1 class="text-3xl font-bold mb-4">Selamat datang di SympAI 👋</h1>

    <p class="max-w-md text-sm opacity-80 mb-6">
      {{ selectedMessage }}
    </p>

    <div v-if="isEmptyPatient">
      <button class="btn btn-md btn-outline btn-secondary" @click="openPatientModal">Pasien Baru</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Patient from '@/components/Modals/Patient.vue';

const props = defineProps({
  isEmptyPatient: Boolean,
})

const messages = [
  {
    isForEmptyPatient: true,
    message: "Silakan mulai dengan menambahkan pasien terlebih dahulu. Atau anda bisa mencari pasien terdaftar pada menu di sebelah kiri",
  },
  {
    isForEmptyPatient: false,
    message:
      "Mari mulai mendiagnosa dengan menjelaskan pada kolom di bawah atau gunakan fitur berbicara untuk mendengarkan keluhan.",
  },
]

const selectedMessage = computed(() =>
  messages.find((m) => m.isForEmptyPatient === props.isEmptyPatient)?.message
)

const modalPatient = ref(null)

const openPatientModal = () => {
  modalPatient.value?.showModal()
}
</script>
