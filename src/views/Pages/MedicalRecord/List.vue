<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Patient Header -->
            <div class="bg-primary text-primary-content p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 class="text-2xl font-bold">{{ patient.name }}</h1>
                        <div class="flex flex-wrap gap-4 mt-2">
                            <div class="badge badge-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {{ patient.gender }}, {{ patient.age }} years
                            </div>
                            <div class="badge badge-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {{ patient.medicalRecord }}
                            </div>
                            <div class="badge badge-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                DOB: {{ formatDate(patient.birthDate) }}
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <router-link :to="`/patients/${patient.id}/edit`" class="btn btn-sm btn-outline btn-secondary">
                            Edit Patient
                        </router-link>
                        <button class="btn btn-sm btn-primary gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            New Visit
                        </button>
                    </div>
                </div>
            </div>

            <!-- Medical History Navigation -->
            <div class="tabs tabs-boxed bg-base-200 px-4 pt-4">
                <a class="tab" :class="{ 'tab-active': activeTab === 'visits' }" @click="activeTab = 'visits'">Clinical
                    Visits</a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'prescriptions' }"
                    @click="activeTab = 'prescriptions'">Prescriptions</a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'labs' }" @click="activeTab = 'labs'">Lab
                    Results</a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'allergies' }"
                    @click="activeTab = 'allergies'">Allergies</a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'immunizations' }"
                    @click="activeTab = 'immunizations'">Immunizations</a>
            </div>

            <!-- Medical History Content -->
            <div class="p-6">
                <!-- Visits Tab -->
                <div v-if="activeTab === 'visits'" class="space-y-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Clinical Visit History</h3>
                        <div class="form-control">
                            <select v-model="visitFilter" class="select select-sm">
                                <option value="all">All Visits</option>
                                <option value="lastYear">Last Year</option>
                                <option value="last6Months">Last 6 Months</option>
                                <option value="lastMonth">Last Month</option>
                            </select>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div v-for="visit in filteredVisits" :key="visit.id" class="card bg-base-100 shadow">
                            <div class="card-body">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                        <h4 class="card-title">
                                            {{ formatDate(visit.date) }} - {{ visit.reason }}
                                            <span class="badge ml-2" :class="{
                                                'badge-primary': visit.type === 'routine',
                                                'badge-secondary': visit.type === 'followup',
                                                'badge-accent': visit.type === 'emergency'
                                            }">
                                                {{ visit.type }}
                                            </span>
                                        </h4>
                                        <p class="text-sm text-gray-500">Seen by Dr. {{ visit.doctor }}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button class="btn btn-sm btn-ghost" @click="viewVisitDetails(visit)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                        <router-link :to="`/visits/${visit.id}/edit`" class="btn btn-sm btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </router-link>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <p class="text-sm"><span class="font-medium">Diagnosis:</span> {{ visit.diagnosis }}
                                    </p>
                                    <p class="text-sm"><span class="font-medium">Treatment:</span> {{ visit.treatment }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div v-if="filteredVisits.length === 0" class="text-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-gray-500 mt-2">No visit records found</p>
                        </div>
                    </div>
                </div>

                <!-- Prescriptions Tab -->
                <div v-if="activeTab === 'prescriptions'" class="space-y-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Prescription History</h3>
                        <button class="btn btn-sm btn-primary gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            New Prescription
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="table w-full">
                            <thead>
                                <tr>
                                    <th>Medication</th>
                                    <th>Date Prescribed</th>
                                    <th>Prescribing Doctor</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prescription in prescriptions" :key="prescription.id">
                                    <td>
                                        <div class="font-medium">{{ prescription.medication }}</div>
                                        <div class="text-sm text-gray-500">{{ prescription.dosage }}</div>
                                    </td>
                                    <td>{{ formatDate(prescription.date) }}</td>
                                    <td>Dr. {{ prescription.doctor }}</td>
                                    <td>
                                        <span class="badge" :class="{
                                            'badge-success': prescription.status === 'active',
                                            'badge-warning': prescription.status === 'completed',
                                            'badge-error': prescription.status === 'cancelled'
                                        }">
                                            {{ prescription.status }}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-ghost btn-xs">Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Other Tabs Content -->
                <div v-if="activeTab === 'labs'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p class="text-gray-500 mt-4">Lab results will appear here</p>
                </div>

                <div v-if="activeTab === 'allergies'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4m0 4h.01" />
                    </svg>
                    <p class="text-gray-500 mt-4">Allergy information will appear here</p>
                </div>

                <div v-if="activeTab === 'immunizations'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-500 mt-4">Immunization records will appear here</p>
                </div>
            </div>
        </div>

        <!-- Visit Details Modal -->
        <div class="modal" :class="{ 'modal-open': showVisitModal }">
            <div class="modal-box max-w-4xl">
                <h3 class="font-bold text-lg">Visit Details - {{ formatDate(selectedVisit?.date) }}</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <h4 class="font-semibold mb-2">Basic Information</h4>
                        <div class="space-y-2">
                            <p><span class="font-medium">Visit Type:</span> {{ selectedVisit?.type }}</p>
                            <p><span class="font-medium">Reason:</span> {{ selectedVisit?.reason }}</p>
                            <p><span class="font-medium">Doctor:</span> Dr. {{ selectedVisit?.doctor }}</p>
                            <p><span class="font-medium">Location:</span> {{ selectedVisit?.location || 'Main Clinic' }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">Clinical Notes</h4>
                        <div class="space-y-2">
                            <p><span class="font-medium">Diagnosis:</span> {{ selectedVisit?.diagnosis }}</p>
                            <p><span class="font-medium">Treatment:</span> {{ selectedVisit?.treatment }}</p>
                            <p><span class="font-medium">Follow-up:</span>
                                {{ selectedVisit?.followUp || 'None Irecommended' }}</p>
                        </div>
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn" @click="showVisitModal = false">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('visits')
const visitFilter = ref('all')
const showVisitModal = ref(false)
const selectedVisit = ref(null)

// Sample patient data - replace with API call
const patient = ref({
    id: route.params.id,
    name: 'John Smith',
    medicalRecord: 'MRN-2023-00145',
    gender: 'Male',
    age: 42,
    birthDate: '1981-05-15'
})

// Sample visits data - replace with API call
const visits = ref([
    {
        id: 1,
        date: '2023-06-15',
        type: 'followup',
        reason: 'Hypertension check',
        doctor: 'Sarah Johnson',
        diagnosis: 'Controlled hypertension',
        treatment: 'Continued current medication (Lisinopril 10mg daily)',
        followUp: '3 months'
    },
    {
        id: 2,
        date: '2023-04-10',
        type: 'routine',
        reason: 'Annual physical',
        doctor: 'Michael Chen',
        diagnosis: 'Normal physical exam',
        treatment: 'Recommended lifestyle modifications',
        location: 'Downtown Clinic'
    },
    {
        id: 3,
        date: '2023-01-05',
        type: 'emergency',
        reason: 'Chest pain',
        doctor: 'Lisa Park',
        diagnosis: 'Musculoskeletal chest pain',
        treatment: 'NSAIDs as needed, rest',
        followUp: '1 week'
    }
])

// Sample prescriptions data - replace with API call
const prescriptions = ref([
    {
        id: 1,
        medication: 'Lisinopril',
        dosage: '10mg tablet, once daily',
        date: '2023-06-15',
        doctor: 'Sarah Johnson',
        status: 'active'
    },
    {
        id: 2,
        medication: 'Atorvastatin',
        dosage: '20mg tablet, once at bedtime',
        date: '2023-04-10',
        doctor: 'Michael Chen',
        status: 'active'
    },
    {
        id: 3,
        medication: 'Ibuprofen',
        dosage: '400mg as needed',
        date: '2023-01-05',
        doctor: 'Lisa Park',
        status: 'completed'
    }
])

// Filter visits based on selected time period
const filteredVisits = computed(() => {
    const now = new Date()
    let cutoffDate = new Date(0) // Default to all visits

    switch (visitFilter.value) {
        case 'lastYear':
            cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1))
            break
        case 'last6Months':
            cutoffDate = new Date(now.setMonth(now.getMonth() - 6))
            break
        case 'lastMonth':
            cutoffDate = new Date(now.setMonth(now.getMonth() - 1))
            break
    }

    return visits.value.filter(visit => {
        return visitFilter.value === 'all' || new Date(visit.date) >= cutoffDate
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

// View visit details
const viewVisitDetails = (visit) => {
    selectedVisit.value = visit
    showVisitModal.value = true
}

// Load patient data on mount
onMounted(() => {
    // In a real app, you would fetch patient data here
    // fetchPatient(route.params.id)
})
</script>

<style scoped></style>