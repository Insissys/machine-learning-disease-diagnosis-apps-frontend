<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Patient Waiting List</h2>
            <input v-model="search" type="text" placeholder="Search patients..."
                class="mb-4 px-4 py-2 border rounded w-full" />
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Medical Record</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in filteredPatients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.medicalRecord }}</td>
                        <td>{{ patient.birthDate }}</td>
                        <td>
                            <router-link :to="`/interrogator/${patient.id}`" class="btn btn-sm btn-accent">Input
                                Symptom</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const patients = ref([
    { id: 1, name: 'John Smith', medicalRecord: 'MR001', birthDate: '1990-01-01' },
    { id: 2, name: 'Jane Doe', medicalRecord: 'MR002', birthDate: '1985-05-12' },
])

const filteredPatients = computed(() => {
    return patients.value.filter(p =>
        p.name.toLowerCase().includes(search.value.toLowerCase()) ||
        p.medicalRecord.toLowerCase().includes(search.value.toLowerCase())
    )
})
</script>