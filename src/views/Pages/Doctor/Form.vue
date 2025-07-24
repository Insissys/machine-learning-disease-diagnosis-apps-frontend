<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
                <!-- Symptoms Input Form -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <!-- Form Header -->
                    <div class="bg-primary text-white p-4">
                        <h2 class="text-2xl font-bold">
                            Symptoms Input
                        </h2>
                        <p class="text-sm opacity-90">
                            Describe the symptoms below
                        </p>
                    </div>

                    <form @submit.prevent="submitForm" class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                            <!-- Medical Record -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Medical Record Number</span>
                                </label>
                                <input v-model="patient.medicalRecord" type="text" class="input input-bordered w-full"
                                    disabled />
                            </div>

                            <!-- Patient Name -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Full Name</span>
                                </label>
                                <input v-model="patient.name" type="text" class="input input-bordered w-full"
                                    disabled />
                            </div>

                            <!-- Date of Birth -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Date of Birth</span>
                                </label>
                                <input v-model="patient.birthDate" type="text" class="input input-bordered w-full"
                                    disabled />
                            </div>

                            <!-- Gender -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Gender</span>
                                </label>
                                <input v-model="patient.gender" type="text" class="input input-bordered w-full"
                                    disabled />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-6">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Input Symptoms</span>
                                </label>
                                <textarea v-model="symptom" class="textarea textarea-bordered w-full resize-none"
                                    placeholder="Describe symptoms..." rows="5"></textarea>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6">
                            <button @click="startVoiceInput" type="button"
                                class="btn btn-primary sm:w-auto w-full text-white">
                                Listen
                            </button>
                            <button type="submit" class="btn btn-primary sm:w-auto w-full text-white"
                                :disabled="isSubmitting">
                                <span v-if="!isSubmitting">
                                    Submit
                                </span>
                                <span v-else class="loading loading-spinner"></span>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Medical History Cards -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-primary text-white p-4">
                        <h2 class="text-2xl font-bold">Medical History</h2>
                    </div>
                    <div class="p-4 space-y-4">
                        <div v-if="medicalHistory.length > 0">
                            <div v-for="(history, index) in medicalHistory" :key="index"
                                class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="font-bold text-lg">{{ history.date }}</h3>
                                        <p class="text-gray-600">{{ history.symptoms }}</p>
                                    </div>
                                    <span class="badge" :class="{
                                        'badge-success': history.status === 'approved',
                                        'badge-warning': history.status === 'pending',
                                        'badge-error': history.status === 'rejected'
                                    }">
                                        {{ history.status }}
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <p class="font-semibold">Diagnosis:</p>
                                    <ul class="list-disc list-inside ml-4">
                                        <li v-for="(diag, i) in history.diagnosis" :key="i">{{ diag }}</li>
                                    </ul>
                                </div>
                                <div v-if="history.feedback" class="mt-2">
                                    <p class="font-semibold">Doctor's Feedback:</p>
                                    <p class="text-gray-700">{{ history.feedback }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-gray-400 italic">
                            No medical history available for this patient.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- ML Diagnosis Result -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-4">Machine Learning Diagnosis</h2>
                    <div v-if="mlResult">
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Top 5 Possible Conditions:</h3>
                            <div class="space-y-2">
                                <div v-for="(item, index) in mlResult.predictions" :key="index"
                                    class="flex items-center p-2 border rounded hover:bg-gray-50">
                                    <input type="radio" :id="'diagnosis-' + index" v-model="selectedDiagnosis"
                                        :value="item" class="radio radio-primary mr-3">
                                    <label :for="'diagnosis-' + index" class="flex-1">
                                        <span class="font-medium">{{ item.condition }}</span>
                                        <span class="text-gray-600 text-sm block">Confidence: {{ item.confidence
                                            }}%</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Recommendations:</h3>
                            <ul class="list-disc list-inside ml-4">
                                <li v-for="(rec, i) in mlResult.recommendations" :key="i">{{ rec }}</li>
                            </ul>
                        </div>

                        <!-- Doctor Approval Section -->
                        <div class="border-t pt-4 mt-4">
                            <h3 class="font-semibold mb-2">Doctor's Review</h3>
                            <div class="flex space-x-3 mb-4">
                                <button @click="approveDiagnosis(true)" class="btn btn-success flex-1"
                                    :disabled="!selectedDiagnosis || approvalStatus !== null">
                                    Approve
                                </button>
                                <button @click="approveDiagnosis(false)" class="btn btn-error flex-1"
                                    :disabled="!selectedDiagnosis || approvalStatus !== null">
                                    Reject
                                </button>
                            </div>

                            <div v-if="approvalStatus !== null" class="mb-4">
                                <div class="alert" :class="{
                                    'alert-success': approvalStatus === 'approved',
                                    'alert-error': approvalStatus === 'rejected'
                                }">
                                    <span>Diagnosis {{ approvalStatus }}.</span>
                                </div>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Feedback</span>
                                </label>
                                <textarea v-model="doctorFeedback" class="textarea textarea-bordered w-full"
                                    placeholder="Add your feedback about the ML diagnosis..." rows="3"></textarea>
                            </div>

                            <button @click="submitFeedback" class="btn btn-primary mt-3 w-full"
                                :disabled="!doctorFeedback || approvalStatus === null">
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                    <div v-else class="text-gray-400 italic">No result yet. Please input symptoms first.</div>
                </div>

                <!-- Final Diagnosis -->
                <div v-if="finalDiagnosis" class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-4">Final Diagnosis</h2>
                    <div class="alert alert-success">
                        <div>
                            <h3 class="font-bold">{{ finalDiagnosis.condition }}</h3>
                            <div class="text-xs">Approved by Dr. {{ finalDiagnosis.doctor }} on {{ finalDiagnosis.date
                                }}</div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h3 class="font-semibold mb-2">Doctor's Notes:</h3>
                        <p class="text-gray-700">{{ finalDiagnosis.notes }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const symptom = ref('')
const mlResult = ref(null)
const isSubmitting = ref(false)
const selectedDiagnosis = ref(null)
const approvalStatus = ref(null)
const doctorFeedback = ref('')
const finalDiagnosis = ref(null)

const patient = ref({
    name: '',
    medicalRecord: '',
    birthDate: '',
    gender: ''
})

const medicalHistory = ref([
    {
        date: '2023-05-15',
        symptoms: 'Fever, headache, sore throat',
        diagnosis: ['Pharyngitis', 'Viral infection'],
        status: 'approved',
        feedback: 'Confirmed viral pharyngitis. Recommended symptomatic treatment.'
    },
    {
        date: '2023-03-10',
        symptoms: 'Chest pain, shortness of breath',
        diagnosis: ['GERD', 'Musculoskeletal pain'],
        status: 'approved',
        feedback: 'GERD confirmed after endoscopy. Prescribed PPI.'
    },
    {
        date: '2023-01-05',
        symptoms: 'Dizziness, fatigue',
        diagnosis: ['Anemia', 'Dehydration'],
        status: 'rejected',
        feedback: 'Diagnosis incorrect. Patient had orthostatic hypotension.'
    }
])

onMounted(() => {
    const id = route.params.id
    // Fetch patient by ID. Replace with API call.
    if (id === '1') {
        patient.value = {
            id: 1,
            name: 'John Smith',
            medicalRecord: 'MR001',
            birthDate: '1990-01-01',
            gender: 'Male'
        }
    } else if (id === '2') {
        patient.value = {
            id: 2,
            name: 'Jane Doe',
            medicalRecord: 'MR002',
            birthDate: '1985-05-12',
            gender: 'Female'
        }
    }
})

const submitForm = async () => {
    if (!symptom.value.trim()) return alert('Symptom is required.')

    isSubmitting.value = true

    try {
        // Simulate API call to ML service
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock ML response with 5 possible conditions
        mlResult.value = {
            predictions: [
                { condition: 'Influenza (Flu)', confidence: 87 },
                { condition: 'Common Cold', confidence: 76 },
                { condition: 'COVID-19', confidence: 65 },
                { condition: 'Strep Throat', confidence: 58 },
                { condition: 'Allergic Rhinitis', confidence: 42 }
            ],
            recommendations: [
                'Get plenty of rest',
                'Drink fluids to stay hydrated',
                'Consider over-the-counter fever reducers',
                'Monitor for difficulty breathing',
                'Follow up in 3 days if symptoms persist'
            ]
        }

        // Reset approval state
        selectedDiagnosis.value = null
        approvalStatus.value = null
        doctorFeedback.value = ''
        finalDiagnosis.value = null
    } finally {
        isSubmitting.value = false
    }
}

const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support voice recognition')
        return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'id-ID'
    recognition.onresult = (event) => {
        symptom.value = event.results[0][0].transcript
    }
    recognition.onerror = (event) => {
        alert('Voice recognition error: ' + event.error)
    }
    recognition.start()
}

const approveDiagnosis = (isApproved) => {
    if (!selectedDiagnosis.value) return

    approvalStatus.value = isApproved ? 'approved' : 'rejected'
}

const submitFeedback = () => {
    if (!doctorFeedback.value.trim() || approvalStatus.value === null) return

    if (approvalStatus.value === 'approved') {
        finalDiagnosis.value = {
            condition: selectedDiagnosis.value.condition,
            doctor: 'Smith',
            date: new Date().toLocaleDateString(),
            notes: doctorFeedback.value
        }

        // Add to medical history
        medicalHistory.value.unshift({
            date: new Date().toLocaleDateString(),
            symptoms: symptom.value,
            diagnosis: [selectedDiagnosis.value.condition],
            status: 'approved',
            feedback: doctorFeedback.value
        })
    } else {
        // Add rejected diagnosis to history
        medicalHistory.value.unshift({
            date: new Date().toLocaleDateString(),
            symptoms: symptom.value,
            diagnosis: mlResult.value.predictions.map(p => p.condition),
            status: 'rejected',
            feedback: doctorFeedback.value
        })
    }

    // Reset form
    symptom.value = ''
    mlResult.value = null
}
</script>