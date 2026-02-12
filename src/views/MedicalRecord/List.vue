<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Info ref="infoModal" />

        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Medical Records</h2>
                    <p class="text-sm text-gray-500 mt-1">Total patients: {{ patientStore.patients?.length }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input v-model="patientStore.search" type="text" placeholder="Search" class="input w-full" />
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
                            <td>{{ patient.medical_record_number }}</td>
                            <td>{{ patient.name }}</td>
                            <td>
                                <span
                                    :class="`badge ${patient.gender?.toLowerCase() === 'male' ? 'badge-info' : 'badge-secondary'} text-white`">
                                    {{ patient.gender }}
                                </span>
                            </td>
                            <td>{{ formatDate(patient.birth_date) }}</td>
                            <td class="text-right">
                                <div class="flex justify-end gap-2">
                                    <button @click="redirectTo(patient.id)"
                                        class="tooltip btn btn-ghost btn-sm btn-square text-info" data-tip="Info">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                        </svg>
                                    </button>
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
                                    <p class="text-gray-500">No medical records found</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
import Info from '@/components/Modals/Info.vue'
import { useRouter } from 'vue-router'
import { useMedicalRecordsStore } from '@/stores/medicalrecords'

const patientStore = usePatientStore()
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 10
const infoModal = ref()
const router = useRouter()
const medicalRecordsStore = useMedicalRecordsStore()

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

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

async function redirectTo(id) {
    try {
        await medicalRecordsStore.fetchMedicalRecords(id)
        router.push({ name: 'medicalrecords.info' })
    } catch (error) {
        modalRef.value.show(error)
    }
}

// Lifecycle hooks
onMounted(() => {
    loadPatients()
})
</script>