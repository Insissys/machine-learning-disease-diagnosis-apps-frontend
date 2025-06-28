<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <div class="max-w-7xl mx-auto bg-white rounded shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Patient Form</h2>
            <form @submit.prevent="submitForm">
                <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Medical Record</legend>
                        <input v-model="patient.medicalRecord" type="text" class="input w-full"
                            placeholder="Medical Record" />
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Patient Name</legend>
                        <input v-model="patient.name" type="text" class="input w-full" placeholder="Patient Name" />
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Birth Day</legend>
                        <vue-date-picker v-model="patient.birthDate" :month-change-on-scroll="false"
                            model-type="dd-MM-yyyy" :always-clearable="true" auto-apply placeholder="Birth Day"
                            autocomplete="off" :teleport="false" format="dd-MM-yyy" :hide-input-icon="true"
                            :ui="{ input: '!input !w-full !text-base-content', menu: '!absolute' }" />
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Gender</legend>
                        <select v-model="patient.gender" class="select w-full">
                            <option value="" disabled selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </fieldset>
                </div>

                <div class="flex flex-col sm:flex-row sm:justify-start items-center gap-4 mt-6">
                    <router-link to="/patients" class="btn btn-secondary w-full sm:w-auto text-base-content">
                        Back
                    </router-link>

                    <button class="btn btn-primary w-full sm:w-auto" @click="savePatient"
                        :disabled="patientStore.isLoading">
                        <span v-if="!patientStore.isLoading">Save Patient</span>
                        <span v-else class="loading loading-spinner loading-sm"></span>
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '@/stores'
import Errors from '@/components/Modals/Errors.vue'

const router = useRouter()
const patientStore = usePatientStore()
const modalRef = ref()

const patient = ref({
    medicalRecord: '',
    name: '',
    gender: '',
    birthDate: '',
})

async function savePatient() {
    await patientStore.createPatient(patient.value)
    if (!patientStore.error) {
        router.push('/patients')
    } else {
        modalRef.value.show(patientStore.error) // or use your error modal here
    }
}
</script>