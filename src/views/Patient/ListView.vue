<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <!-- <Delete ref="deleteModal" @confirm="confirmDelete" /> -->
        <Info ref="infoModal" />

        <div class="p-6 space-y-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 class="text-2xl font-bold">Patients Management</h1>
                    <p class="text-sm opacity-60">
                    Manage all registered patients in your clinic
                    </p>
                </div>

                <div class="flex gap-3">
                    <div class="relative">
                        <input
                            v-model="patientStore.search"
                            type="text"
                            placeholder="Search patient..."
                            class="input input-bordered w-64 pl-10"
                        />
                        <span class="absolute left-3 top-2.5 opacity-50">🔍</span>
                    </div>

                    <router-link to="/patients/create" class="btn btn-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Patient
                    </router-link>
                </div>

            </div>

            <div class="card bg-base-100 shadow-sm border border-base-300/60">
                <div class="card-body p-0">
                    <div class="overflow-x-auto border border-base-300/60 rounded-2xl">
                        <table class="table w-full">
                            <thead class="bg-base-200/60 text-base-content/70 text-xs uppercase tracking-wider">
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
                                    class="hover:bg-base-200/40 transition-colors duration-200">
                                    <td>{{ patient.medical_record_number }}</td>
                                    <td>{{ patient.name }}</td>
                                    <td>
                                        <span
                                            :class="[
                                                'badge badge-sm',
                                                patient.gender === 'Male'
                                                ? 'badge-info badge-outline'
                                                : 'badge-secondary badge-outline'
                                            ]">
                                            {{ patient.gender }}
                                        </span>
                                    </td>
                                    <td>{{ formatDate(patient.birth_date) }}</td>
                                    <td class="text-right">
                                        <div class="flex justify-end gap-1">
                                            <router-link
                                                :to="`/patients/${patient.id}/edit`"
                                                class="btn btn-ghost btn-sm btn-circle hover:bg-info/10 text-info"
                                            >
                                            ✏️
                                            </router-link>

                                            <!-- <button
                                                class="btn btn-sm btn-ghost hover:bg-error/10 text-error"
                                            >
                                            🗑️
                                            </button> -->
                                            <!-- <button class="tooltip btn btn-ghost btn-sm btn-square text-error"
                                                @click="askToDelete(patient.id)" data-tip="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button> -->
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="patientStore.filteredPatients?.length === 0">
                                    <td colspan="5" class="text-center py-8">
                                        <div class="flex flex-col items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p class="text-gray-500">No patients found</p>
                                            <router-link to="/patients/create" class="btn btn-sm btn-primary mt-2 text-white">
                                                Add New Patient
                                            </router-link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="border-t border-base-300/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing {{ startItem }}-{{ endItem }} of {{ patientStore.filteredPatients?.length }} patients
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
import { usePatientStore } from '@/stores/patient'
import Errors from '@/components/Modals/Errors.vue'
// import Delete from '@/components/Modals/Delete.vue'
import Info from '@/components/Modals/Info.vue'

const patientStore = usePatientStore()
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 10
const deleteModal = ref()
const patientIdToDelete = ref(null)
const infoModal = ref()

// Computed properties
const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return patientStore.filteredPatients.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(patientStore.filteredPatients?.length / itemsPerPage)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, patientStore.filteredPatients?.length)
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
async function loadPatients() {
    if (patientStore.isLoading) return

    try {
        await patientStore.fetchAllPatients()
    } catch (err) {
        modalRef.value.show(err.message)
    }
}

// function askToDelete(id) {
//     patientIdToDelete.value = id
//     deleteModal.value.show('Are you sure you want to delete this patient?')
// }

// function confirmDelete() {
//     if (patientIdToDelete.value) {
//         patientStore.deletePatient(patientIdToDelete.value)
//             .then((res) => {
//                 infoModal.value.show(res.data.message || 'Patient Deleted')
//                 loadPatients()
//             })
//             .catch(err => {
//                 modalRef.value.show(err)
//             })
//     }
// }

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

// Lifecycle hooks
onMounted(() => {
    loadPatients()
})
</script>