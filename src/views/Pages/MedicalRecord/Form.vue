<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Patient Header -->
            <div class="bg-red-500 text-primary-content p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 class="text-2xl font-bold text-white">{{ patient.name }}</h1>
                        <div class="flex flex-wrap gap-4 mt-2">
                            <div class="badge badge-outline text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {{ patient.gender }}, {{ calculateAge(patient.birth_date) }} years
                            </div>
                            <div class="badge badge-outline text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {{ patient.medical_record_number }}
                            </div>
                            <div class="badge badge-outline text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                DOB: {{ formatDate(patient.birth_date) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Medical History Navigation -->
            <div class="tabs tabs-boxed bg-base-200 px-4 pt-4">
                <a class="tab" :class="{ 'tab-active': activeTab === 'visits' }" @click="activeTab = 'visits'">Clinical
                    Visits
                </a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'labs' }" @click="activeTab = 'labs'">Lab
                    Results
                </a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'allergies' }" @click="activeTab = 'allergies'">
                    Allergies
                </a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'immunizations' }"
                    @click="activeTab = 'immunizations'">
                    Immunizations
                </a>
            </div>

            <!-- Medical History Content -->
            <div class="p-6">
                <!-- Visits Tab -->
                <div v-if="activeTab === 'visits'" class="space-y-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Clinical Visit History</h3>
                    </div>

                    <div class="space-y-4">
                        <div v-for="record in medicalRecordsStore.medicalrecords" :key="record.id"
                            class="card bg-base-100 shadow">
                            <div class="card-body">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                        <h4 class="card-title">
                                            {{ record.medical_record_number }} - {{ formatDate(record.updated_at) }}
                                        </h4>
                                        <p class="text-sm text-gray-500">Visited by Dr. {{ record.interrogator.name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-4 space-y-3">
                                    <!-- Diagnosis Section -->
                                    <div class="bg-blue-50 p-3 rounded-lg">
                                        <h3 class="text-sm font-semibold text-blue-800 mb-1">Diagnosis</h3>
                                        <p v-if="record.diagnosis" class="text-sm text-gray-800">
                                            {{ record.diagnosis }}
                                        </p>
                                        <p v-else class="text-sm text-gray-500 italic">
                                            No diagnosis available
                                        </p>
                                    </div>

                                    <!-- Predictions Section -->
                                    <div class="bg-gray-50 p-3 rounded-lg">
                                        <h3 class="text-sm font-semibold text-gray-800 mb-2">Predictions</h3>

                                        <template
                                            v-if="record.predictions && parsePrediction(record.predictions).length > 0">
                                            <ul class="space-y-2">
                                                <li v-for="(prediction, idx) in parsePrediction(record.predictions)"
                                                    :key="idx" class="flex items-start">
                                                    <span
                                                        class="h-1.5 w-1.5 mt-1.5 mr-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                                                    <div>
                                                        <span class="text-sm font-medium text-gray-900">{{
                                                            prediction.disease }}</span>
                                                        <span class="text-xs text-gray-500 ml-1.5">
                                                            ({{ (prediction.confidence * 100).toFixed(2) }}% confidence)
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </template>
                                        <template v-else>
                                            <p class="text-sm text-gray-500 italic">No predictions available</p>
                                        </template>
                                    </div>

                                    <!-- Feedback Section -->
                                    <div class="bg-green-50 p-3 rounded-lg border border-green-100">
                                        <div class="flex justify-between items-start mb-2">
                                            <h3 class="text-sm font-semibold text-green-800 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4 mr-1.5 text-green-600" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Doctor Feedback
                                            </h3>

                                            <!-- Status Badge -->
                                            <span v-if="record.feedback?.approved"
                                                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                                :class="{
                                                    'bg-green-100 text-green-800': record.feedback.approved,
                                                    'bg-red-100 text-red-800': !record.feedback.approved
                                                }">
                                                {{ record.feedback.approved ? 'Approved' : 'Reject' }}
                                            </span>
                                            <span v-else
                                                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending Review
                                            </span>
                                        </div>

                                        <template v-if="record.feedback?.response">
                                            <p
                                                class="text-sm text-gray-800 bg-white p-2 rounded border border-green-100">
                                                {{ record.feedback.response }}
                                            </p>
                                        </template>
                                        <template v-else>
                                            <p class="text-sm text-gray-500 italic">
                                                No feedback provided yet
                                            </p>
                                        </template>

                                        <!-- Timestamp if available -->
                                        <p v-if="record.feedback?.timestamp"
                                            class="text-xs text-gray-500 mt-1 text-right">
                                            {{ formatDate(record.feedback.timestamp) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="medicalRecordsStore.medicalrecords === 0" class="text-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-gray-500 mt-2">No visit records found</p>
                        </div>
                    </div>
                </div>

                <!-- Other Tabs Content -->
                <div v-if="activeTab === 'labs'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p class="text-gray-500 mt-4">Lab results will appear here (Coming Soon)</p>
                </div>

                <div v-if="activeTab === 'allergies'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4m0 4h.01" />
                    </svg>
                    <p class="text-gray-500 mt-4">Allergy information will appear here (Coming Soon)</p>
                </div>

                <div v-if="activeTab === 'immunizations'" class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-500 mt-4">Immunization records will appear here (Coming Soon)</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMedicalRecordsStore } from '@/stores/medicalrecords'
import { ref, onUnmounted, computed } from 'vue'

// Store
const medicalRecordsStore = useMedicalRecordsStore()

const activeTab = ref('visits')

// Computed
const patient = computed(() => { return medicalRecordsStore.medicalrecords[0].patient ?? {} })

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

const parsePrediction = (data) => {
    const result = JSON.parse(data)
    return result.predictions
}

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

onUnmounted(() => {
    medicalRecordsStore.clearMedicalRecords()
})
</script>

<style scoped></style>