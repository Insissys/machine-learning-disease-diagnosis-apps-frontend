<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Delete ref="deleteModal" @confirm="confirmDelete" />

        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Appointment List</h2>
                    <p class="text-sm text-gray-500 mt-1">Total patients: {{ 0 }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input v-model="patientStore.search" type="text" placeholder="Search"
                            class="input input-bordered w-full" />
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto border rounded-lg">
                <table class="table w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="w-1/6">Medical Record</th>
                            <th class="w-2/6">Patient Name</th>
                            <th class="w-1/6">Gender</th>
                            <th class="w-1/6">Date of Birth</th>
                            <th class="w-1/6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="patient in paginatedPatients" :key="patient.id"
                            class="hover:bg-gray-50 transition-colors">
                            <td>{{ patient.medicalRecord }}</td>
                            <td>{{ patient.name }}</td>
                            <td>
                                <span
                                    :class="`badge ${patient.gender.toLowerCase() === 'male' ? 'badge-info' : 'badge-secondary'} text-white`">
                                    {{ patient.gender }}
                                </span>
                            </td>
                            <td>{{ patient.birthDate }}</td>
                            <td class="text-right">
                                <div class="flex justify-end gap-2">
                                    <router-link to="/patients/input-symptom"
                                        class="btn btn-sm btn-secondary text-white mt-2">
                                        Visit
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="patientStore.filteredPatients.length === 0">
                            <td colspan="5" class="text-center py-8">
                                <div class="flex flex-col items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class="text-gray-500">No patients found</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing {{ startItem }}-{{ endItem }} of {{ patientStore.filteredPatients.length }} patients
                </div>
                <div class="join">
                    <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === 1 }"
                        @click="currentPage--">
                        Previous
                    </button>
                    <button v-for="page in visiblePages" :key="page" class="join-item btn btn-sm"
                        :class="{ 'btn-active': page === currentPage }" @click="currentPage = page">
                        {{ page }}
                    </button>
                    <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === totalPages }"
                        @click="currentPage++">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePatientStore } from '@/stores/patient'

const patientStore = usePatientStore()
const currentPage = ref(1)
const itemsPerPage = 10
const deleteModal = ref()

// Computed properties
const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return patientStore.filteredPatients.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(patientStore.filteredPatients.length / itemsPerPage)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, patientStore.filteredPatients.length)
})

const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})
</script>