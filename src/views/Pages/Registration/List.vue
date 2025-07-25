<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Delete ref="deleteModal" @confirm="confirmDelete" />

        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Registrations</h2>
                    <p class="text-sm text-gray-500 mt-1">Total patients: {{ registrationStore.registrations?.length }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input v-model="registrationStore.search" type="text" placeholder="Search"
                            class="input input-bordered w-full" />
                    </div>
                    <router-link :to="{ name: 'registrations.create' }" class="btn btn-primary gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Register
                    </router-link>
                </div>
            </div>

            <div class="overflow-x-auto border rounded-lg">
                <table class="table w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="w-1/6">Registration Number</th>
                            <th class="w-1/6">Registration Date</th>
                            <th class="w-1/6">Medical Record</th>
                            <th class="w-1/6">Patient Name</th>
                            <th class="w-1/6">Date of Birth</th>
                            <th class="w-1/6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="patient in paginatedPatients" :key="patient.id"
                            class="hover:bg-gray-50 transition-colors">
                            <td></td>
                            <td></td>
                            <td>{{ patient.medicalRecord }}</td>
                            <td>{{ patient.name }}</td>
                            <td>{{ patient.birthDate }}</td>
                            <td class="text-right">
                                <div class="flex justify-end gap-2">
                                    <router-link :to="``" class="tooltip btn btn-ghost btn-sm btn-square text-info"
                                        data-tip="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </router-link>
                                    <button class="tooltip btn btn-ghost btn-sm btn-square text-error"
                                        @click="askToDelete(patient.id)" data-tip="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="registrationStore.filteredRegistrations?.length === 0">
                            <td colspan="6" class="text-center py-8">
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
                    Showing {{ startItem }}-{{ endItem }} of {{ registrationStore.filteredRegistrations?.length }} patients
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
import { ref, computed, onMounted } from 'vue'
import Errors from '@/components/Modals/Errors.vue'
import Delete from '@/components/Modals/Delete.vue'
import { useRegistrationStore } from '@/stores/registration'

const registrationStore = useRegistrationStore()
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 10
const deleteModal = ref()
const patientIdToDelete = ref(null)

// Computed properties
const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return registrationStore.filteredRegistrations.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(registrationStore.filteredRegistrations?.length / itemsPerPage)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, registrationStore.filteredRegistrations?.length)
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

// Methods
async function loadRegistrations() {
    if (registrationStore.isLoading) return

    try {
        await registrationStore.fetchAllRegistrations()
    } catch (err) {
        modalRef.value.show(err)
    }
}

function askToDelete(id) {
    patientIdToDelete.value = id
    deleteModal.value.show('Are you sure you want to delete this patient?')
}

function confirmDelete() {
    if (patientIdToDelete.value) {
        registrationStore.deleteRegistration(patientIdToDelete.value)
            .then(() => {
                // Reset to first page if we deleted the last item on current page
                if (paginatedPatients.value?.length === 0 && currentPage.value > 1) {
                    currentPage.value--
                }
            })
            .catch(err => {
                modalRef.value.show(err)
            })
    }
}

// Lifecycle hooks
onMounted(() => {
    loadRegistrations()
})
</script>