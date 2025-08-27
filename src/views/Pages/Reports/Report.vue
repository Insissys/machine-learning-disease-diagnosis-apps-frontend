<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Report Header -->
            <div class="bg-red-500 text-primary-content p-6 print:bg-red-500 print:text-primary-content">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 class="text-2xl font-bold">{{ clinic.name }} - Medical History Report</h1>
                        <p class="text-sm opacity-90">Generated on {{ currentDate }}</p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="generatePDF" class="btn btn-sm btn-outline btn-secondary gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            Export PDF
                        </button>
                        <button @click="printReport" class="btn btn-sm bg-red-500 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Report
                        </button>
                    </div>
                </div>
            </div>

            <!-- Patient Information -->
            <div class="p-6 border-b print:border-b">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 class="font-bold text-lg mb-2">Patient Information</h3>
                        <div class="space-y-1">
                            <p><span class="font-medium">Name:</span> {{ patient.name }}</p>
                            <p><span class="font-medium">MRN:</span> {{ patient.medicalRecord }}</p>
                            <p><span class="font-medium">DOB:</span> {{ formatDate(patient.birthDate) }} ({{ patient.age
                                }} years)</p>
                            <p><span class="font-medium">Gender:</span> {{ patient.gender }}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Contact Information</h3>
                        <div class="space-y-1">
                            <p><span class="font-medium">Phone:</span> {{ patient.phone || 'N/A' }}</p>
                            <p><span class="font-medium">Email:</span> {{ patient.email || 'N/A' }}</p>
                            <p><span class="font-medium">Address:</span> {{ patient.address || 'N/A' }}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Medical Summary</h3>
                        <div class="space-y-1">
                            <p><span class="font-medium">Blood Type:</span> {{ patient.bloodType || 'Unknown' }}</p>
                            <p>
                                <span class="font-medium">Allergies:</span>
                                {{ patient.allergies?.join(', ') || 'None recorded' }}
                            </p>
                            <p><span class="font-medium">Last Visit:</span> {{ formatDate(patient.lastVisit) || 'N/A' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Report Content -->
            <div class="p-6 print:p-0">
                <!-- Clinical Visits -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Clinical Visits (Last 12 Months)
                    </h2>

                    <div v-if="filteredVisits.length > 0" class="space-y-4">
                        <div v-for="visit in filteredVisits" :key="visit.id"
                            class="border rounded-lg p-4 print:border print:break-inside-avoid">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                <h3 class="font-semibold text-lg">
                                    {{ formatDate(visit.date) }} - {{ visit.reason }}
                                    <span class="badge ml-2" :class="{
                                        'badge-primary': visit.type === 'routine',
                                        'badge-secondary': visit.type === 'followup',
                                        'badge-accent': visit.type === 'emergency'
                                    }">
                                        {{ visit.type }}
                                    </span>
                                </h3>
                                <p class="text-sm"><span class="font-medium">Provider:</span> Dr. {{ visit.doctor }}</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="font-medium mb-1">Subjective</h4>
                                    <p class="text-sm whitespace-pre-line">{{ visit.subjective || 'N/A' }}</p>
                                </div>
                                <div>
                                    <h4 class="font-medium mb-1">Objective</h4>
                                    <div class="text-sm">
                                        <p><span class="font-medium">BP:</span> {{ visit.vitals?.bp || '--' }}</p>
                                        <p><span class="font-medium">HR:</span> {{ visit.vitals?.hr || '--' }} bpm</p>
                                        <p><span class="font-medium">Temp:</span> {{ visit.vitals?.temp || '--' }}°C</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-3">
                                <h4 class="font-medium mb-1">Assessment & Plan</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p><span class="font-medium">Diagnosis:</span> {{ visit.diagnosis || 'N/A' }}
                                        </p>
                                    </div>
                                    <div>
                                        <p><span class="font-medium">Treatment:</span> {{ visit.treatment || 'N/A' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                        No visit records found in the last 12 months
                    </div>
                </div>

                <!-- Prescriptions -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Active Prescriptions
                    </h2>

                    <div v-if="activePrescriptions.length > 0" class="overflow-x-auto">
                        <table class="table w-full print:table">
                            <thead>
                                <tr>
                                    <th>Medication</th>
                                    <th>Dosage</th>
                                    <th>Prescribed</th>
                                    <th>Provider</th>
                                    <th>Refills</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="rx in activePrescriptions" :key="rx.id">
                                    <td class="font-medium">{{ rx.medication }}</td>
                                    <td>{{ rx.dosage }}</td>
                                    <td>{{ formatDate(rx.date) }}</td>
                                    <td>Dr. {{ rx.doctor }}</td>
                                    <td>{{ rx.refills }} remaining</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                        No active prescriptions
                    </div>
                </div>

                <!-- Allergies & Alerts -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4m0 4h.01" />
                        </svg>
                        Allergies & Alerts
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="border rounded-lg p-4 print:border">
                            <h3 class="font-semibold mb-2">Allergies</h3>
                            <div v-if="patient.allergies?.length > 0" class="space-y-2">
                                <div v-for="(allergy, index) in patient.allergies" :key="index"
                                    class="flex items-start gap-2">
                                    <span class="badge badge-error badge-xs mt-1"></span>
                                    <div>
                                        <p class="font-medium">{{ allergy.type }}</p>
                                        <p class="text-sm text-gray-600">{{ allergy.reaction }}</p>
                                        <p class="text-xs text-gray-500">First noted: {{ formatDate(allergy.date) }}</p>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-gray-500">No known allergies</p>
                        </div>

                        <div class="border rounded-lg p-4 print:border">
                            <h3 class="font-semibold mb-2">Medical Alerts</h3>
                            <div v-if="patient.alerts?.length > 0" class="space-y-2">
                                <div v-for="(alert, index) in patient.alerts" :key="index"
                                    class="flex items-start gap-2">
                                    <span class="badge badge-warning badge-xs mt-1"></span>
                                    <div>
                                        <p class="font-medium">{{ alert.type }}</p>
                                        <p class="text-sm">{{ alert.note }}</p>
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-gray-500">No medical alerts</p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center text-sm text-gray-500 border-t pt-4 print:border-t print:pt-4">
                    <p>{{ clinic.name }} - {{ clinic.address }}</p>
                    <p>Phone: {{ clinic.phone }} | Email: {{ clinic.email }}</p>
                    <p class="mt-2">This report was generated electronically and does not require a signature</p>
                    <p class="text-xs mt-4">Page 1 of 1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import html2pdf from 'html2pdf.js'

const route = useRoute()

// Clinic information
const clinic = ref({
    name: 'PrimeCare Medical Center',
    address: '123 Healthcare Ave, Medical City, MC 12345',
    phone: '(555) 123-4567',
    email: 'info@primecare.example.com'
})

// Current date for report
const currentDate = ref(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}))

// Sample patient data - replace with API call
const patient = ref({
    id: route.params.id,
    name: 'John Smith',
    medicalRecord: 'MRN-2023-00145',
    gender: 'Male',
    age: 42,
    birthDate: '1981-05-15',
    phone: '(555) 987-6543',
    email: 'john.smith@example.com',
    address: '123 Main St, Anytown, AT 12345',
    bloodType: 'A+',
    lastVisit: '2023-06-15',
    allergies: [
        { type: 'Penicillin', reaction: 'Hives', date: '2010-03-12' },
        { type: 'Latex', reaction: 'Contact dermatitis', date: '2015-08-22' }
    ],
    alerts: [
        { type: 'Diabetic', note: 'Type 2 diabetes - monitor glucose levels' },
        { type: 'Hypertension', note: 'On antihypertensive medication' }
    ]
})

// Sample visits data - replace with API call
const visits = ref([
    {
        id: 1,
        date: '2023-06-15',
        type: 'followup',
        reason: 'Hypertension check',
        doctor: 'Sarah Johnson',
        subjective: 'Patient reports feeling well. No headaches or dizziness. Taking medications as prescribed.',
        vitals: { bp: '120/80', hr: 72, temp: 36.8 },
        diagnosis: 'Controlled hypertension',
        treatment: 'Continued current medication (Lisinopril 10mg daily). Follow up in 3 months.'
    },
    {
        id: 2,
        date: '2023-04-10',
        type: 'routine',
        reason: 'Annual physical',
        doctor: 'Michael Chen',
        subjective: 'Routine checkup. No complaints.',
        vitals: { bp: '118/76', hr: 68, temp: 36.5 },
        diagnosis: 'Normal physical exam',
        treatment: 'Recommended lifestyle modifications including diet and exercise.'
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
        status: 'active',
        refills: 2
    },
    {
        id: 2,
        medication: 'Atorvastatin',
        dosage: '20mg tablet, once at bedtime',
        date: '2023-04-10',
        doctor: 'Michael Chen',
        status: 'active',
        refills: 1
    }
])

// Filter visits to last 12 months
const filteredVisits = computed(() => {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    return visits.value.filter(visit => new Date(visit.date) >= oneYearAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Get active prescriptions
const activePrescriptions = computed(() => {
    return prescriptions.value.filter(rx => rx.status === 'active')
})

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

// Print the report
const printReport = () => {
    window.print()
}

// Generate PDF
const generatePDF = () => {
    const element = document.querySelector('.max-w-6xl')
    const opt = {
        margin: 10,
        filename: `Medical_History_${patient.value.name.replace(' ', '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    // html2pdf().from(element).set(opt).save()
}

// Load patient data on mount
onMounted(() => {
    // In a real app, you would fetch patient data here
    // fetchPatient(route.params.id)
})
</script>

<style>
@media print {
    body {
        background: white;
        font-size: 12pt;
    }

    .max-w-6xl {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
        box-shadow: none;
    }

    .btn {
        display: none !important;
    }

    .print\:border {
        border: 1px solid #e2e8f0 !important;
    }

    .print\:border-b {
        border-bottom: 1px solid #e2e8f0 !important;
    }

    .print\:p-0 {
        padding: 0 !important;
    }

    .print\:bg-red-500 {
        background-color: hsl(var(--p)) !important;
        color: hsl(var(--pc)) !important;
    }

    .print\:text-primary-content {
        color: hsl(var(--pc)) !important;
    }

    .break-inside-avoid {
        break-inside: avoid;
    }
}
</style>