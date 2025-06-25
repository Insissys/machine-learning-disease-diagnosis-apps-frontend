<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Patient List</h2>
            <div v-if="patientStore.isLoading" class="text-blue-500">Loading...</div>
            <div v-else-if="patientStore.error" class="text-red-500">{{ patientStore.error }}</div>
            <input v-model="search" type="text" placeholder="Search patients..."
                class="mb-4 px-4 py-2 border rounded w-full" />
            <button class="btn btn-success mb-4">Add New Patient</button>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in filteredPatients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.gender }}</td>
                        <td>{{ patient.dob }}</td>
                        <td>
                            <button class="btn btn-sm btn-info">Edit</button>
                            <button class="btn btn-sm btn-error ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePatientStore } from '@/stores'

const search = ref('')
const patientStore = usePatientStore()

onMounted(() => {
    patientStore.fetchAllPatients()
})

const filteredPatients = computed(() => {
    const keyword = search.value.toLowerCase()
    return patientStore.patients.filter((patient) =>
        patient.name.toLowerCase().includes(keyword)
    )
})
</script>
