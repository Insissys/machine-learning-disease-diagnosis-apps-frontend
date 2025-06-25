<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-2xl mx-auto bg-white rounded shadow-md p-6">
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

                <!-- <div class="mt-6">
                    <label class="block mb-1">Symptoms (Doctor only)</label>
                    <textarea v-model="patient.symptoms" rows="3" class="textarea w-full"
                        placeholder="Describe symptoms..."></textarea>
                </div> -->

                <button class="btn btn-primary mt-4">Save Patient</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const patient = ref({
    medicalRecord: '',
    name: '',
    birthDate: '',
    gender: '',
    symptoms: ''
})
const submitForm = async () => {
    // Call POST or PUT API
}
</script>