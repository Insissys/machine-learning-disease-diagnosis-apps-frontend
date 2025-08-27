<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />

        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Patient's Queuing</h2>
                    <p class="text-sm text-gray-500 mt-1">Total patients: {{ 0 }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input v-model="queueStore.search" type="text" placeholder="Search" class="input w-full" />
                    </div>
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
                        <tr v-for="queue in paginatedData" :key="queue.id" class="hover:bg-gray-50 transition-colors">
                            <td>{{ queue.registration_number }}</td>
                            <td>{{ formatDatewithTime(queue.created_at) }}</td>
                            <td>{{ queue.medical_record.medical_record_number }}</td>
                            <td>{{ queue.medical_record.patient.name }}</td>
                            <td>{{ formatDate(queue.medical_record.patient.birth_date) }}</td>
                            <td class="text-right">
                                <div class="flex justify-end gap-2">
                                    <button type="button" @click="setVisited(queue)"
                                        class="btn btn-sm bg-red-500 text-white mt-2">
                                        Visit
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="queueStore.filteredQueue.length === 0">
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
                    Showing {{ startItem }}-{{ endItem }} of {{ queueStore.filteredQueue.length }} patients
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
import { useProfileStore } from '@/stores/user'
import Errors from '@/components/Modals/Errors.vue';
import { useQueueStore, useVisitedStore } from '@/stores/queue';
import { useRouter } from 'vue-router';

// Stores
const userStore = useProfileStore()
const queueStore = useQueueStore()
const visitedStore = useVisitedStore()

const currentPage = ref(1)
const itemsPerPage = 10
const modalRef = ref()
const router = useRouter()

// Computed properties
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return queueStore.filteredQueue.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(queueStore.filteredQueue.length / itemsPerPage)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, queueStore.filteredQueue.length)
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

async function loadQueue() {
    if (queueStore.isLoading) return

    try {
        await queueStore.fetchAllQueue(userStore.user.id)
    } catch (err) {
        modalRef.value.show(err.message)
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

function formatDatewithTime(dateString) {
    if (!dateString) return 'Unknown'
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }
    return new Date(dateString).toLocaleString('en-CA', options)
}

function setVisited(params) {
    visitedStore.setVisited(params)
    router.push({ name: "doctor.queuing.input-symptom" })
}

onMounted(() => {
    loadQueue()
})
</script>