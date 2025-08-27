<template>
    <div class="dashboard p-6 bg-gray-50 min-h-screen">
        <Errors ref="modalRef" />

        <!-- Dashboard Title -->
        <div class="flex justify-between items-center mb-8">
            <div class="text-sm text-gray-500">
                Last updated: {{ new Date().toLocaleString() }}
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                    <div class="stat-title">Today's Appointments</div>
                    <div class="stat-value text-primary">{{ queueStore.queue.length }}</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Total Patients</div>
                    <div class="stat-value text-secondary">{{ patientStore.patients?.length }}</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Available Staff</div>
                    <div class="stat-value text-accent">{{ usersStore.users?.length }}</div>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Upcoming Appointments -->
            <div class="lg:col-span-2">
                <div class="card bg-white shadow">
                    <div class="card-body">
                        <h2 class="card-title text-xl">Queuing</h2>
                        <div class="overflow-x-auto">
                            <table class="table w-full">
                                <thead>
                                    <tr>
                                        <th>Registration Number</th>
                                        <th>Time</th>
                                        <th>Medical Record</th>
                                        <th>Patient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="queue in paginatedData" :key="queue.id"
                                        class="hover:bg-gray-50 transition-colors">
                                        <td>{{ queue.medical_record.medical_record_number }}</td>
                                        <td>{{ formatDate(queue.created_at) }}</td>
                                        <td>{{ queue.medical_record.medical_record_number }}</td>
                                        <td>{{ queue.medical_record.patient.name }}</td>
                                    </tr>
                                    <tr v-if="queueStore.filteredQueue.length === 0">
                                        <td colspan="4" class="text-center py-8">
                                            <div class="flex flex-col items-center justify-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p class="text-gray-500">No one waiting</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div :hidden="userStore.user?.role.name !== 'doctor'" class="card-actions justify-end mt-4">
                            <router-link :to="{ name: 'doctor.queuing' }" class="btn bg-red-500 text-white">
                                View All Appointments
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions & Notifications -->
            <div class="space-y-6">
                <!-- Quick Actions -->
                <div class="card bg-white shadow">
                    <div class="card-body">
                        <h2 class="card-title text-xl">Quick Actions</h2>
                        <div class="grid md:grid-cols-2 gap-4">
                            <router-link :to="{ name: 'patients.create' }" class="btn bg-red-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Patient
                            </router-link>
                            <router-link :to="{ name: 'registrations.create' }" class="btn btn-accent text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Registration
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Errors from '@/components/Modals/Errors.vue';
import { usePatientStore } from '@/stores/patient';
import { useQueueStore } from '@/stores/queue';
import { useProfileStore, useUserStore } from "@/stores/user";
import { computed, onMounted, ref } from 'vue';

// Store
const queueStore = useQueueStore()
const userStore = useProfileStore()
const patientStore = usePatientStore()
const usersStore = useUserStore()

const currentPage = ref(1)
const itemsPerPage = 10
const modalRef = ref()

// Computed properties
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return queueStore.filteredQueue.slice(start, end)
})

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

async function loadQueue() {
    if (queueStore.isLoading) return

    try {
        await queueStore.fetchAllQueue(userStore.user.id)
    } catch (err) {
        modalRef.value.show(err.message)
    }
}

async function loadPatients() {
    if (patientStore.isLoading) return

    try {
        await patientStore.fetchAllPatients()
    } catch (err) {
        modalRef.value.show(err.message)
    }
}

async function loadUsers() {
    try {
        await usersStore.fetchAllUsers()
    } catch (error) {
        modalRef.value.show(error.message)
    }
}

onMounted(() => {
    loadQueue()
    loadPatients()
    loadUsers()
})
</script>
