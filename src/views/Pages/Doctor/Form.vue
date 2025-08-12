<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Info ref="infoModal" @callback="redirectBack" />

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
                                <span class="input w-full">{{ patient.medical_record.medical_record_number
                                }}</span>
                            </div>

                            <!-- Patient Name -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Full Name</span>
                                </label>
                                <span class="input w-full">{{ patient.medical_record.patient.name }}</span>
                            </div>

                            <!-- Date of Birth -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Date of Birth</span>
                                </label>
                                <span class="input w-full">{{
                                    formatDate(patient.medical_record.patient.birth_date) }}</span>
                            </div>

                            <!-- Gender -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Gender</span>
                                </label>
                                <span class="input w-full">{{ patient.medical_record.patient.gender
                                    }}</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-6">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Input Symptoms</span>
                                </label>
                                <textarea v-model="symptom" class="textarea w-full resize-none mb-2" rows="5"
                                    :disabled="prediction">
                                </textarea>
                                <button @click="startVoiceInput" type="button"
                                    class="btn btn-primary sm:w-auto w-full text-white" :disabled="isListening">
                                    <span v-if="!isListening">
                                        Listening
                                    </span>
                                    <span v-else class="loading loading-spinner"></span>
                                </button>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6">
                            <router-link :to="({ name: 'doctor.queuing' })"
                                class="btn btn-outline btn-secondary sm:w-auto w-full mb-2">
                                Cancel
                            </router-link>
                            <button type="button" @click="resetSymptom"
                                class="btn btn-outline btn-error sm:w-auto w-full mb-2 hover:text-white">
                                Reset
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
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- ML Diagnosis Result -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-4">Diagnosis</h2>
                    <div v-if="prediction">
                        <div v-if="!isChoosen">
                            <div class="mb-4">
                                <h3 class="font-semibold mb-2">Top 5 Predicted Diseases:</h3>
                                <p class="mb-2">(select one)</p>
                                <div class="space-y-2">
                                    <div v-for="(item, index) in prediction.predictions" :key="index"
                                        class="flex items-center p-2 border rounded hover:bg-gray-50">
                                        <input type="radio" :id="'diagnosis-' + index" v-model="selectedDiagnosis"
                                            :value="item" class="radio radio-primary mr-3" :disabled="isChoosen">
                                        <label :for="'diagnosis-' + index" class="flex-1">
                                            <span class="font-medium">{{ item.disease }}</span>
                                            <span class="text-gray-600 text-sm block">
                                                Confidence: {{ calculateConfidence(item.confidence) }}%
                                            </span>
                                        </label>
                                    </div>

                                    <!-- None of the above -->
                                    <div class="flex items-center p-2 border rounded hover:bg-gray-50">
                                        <input type="radio" id="diagnosis-none" v-model="selectedDiagnosis"
                                            :value="{ disease: 'None of the predicted applies', confidence: 0 }"
                                            class="radio radio-primary mr-3" :disabled="isChoosen">
                                        <label for="diagnosis-none" class="flex-1">
                                            <span class="font-medium">None of the predicted applies</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <h3 class="font-semibold mb-2">Symptom predicted:</h3>
                                <ul class="list-disc list-inside ml-4">
                                    <li v-for="(symptom, i) in prediction.symptoms" :key="i">{{ symptom }}</li>
                                </ul>
                            </div>

                            <div class="mb-4">
                                <h3 class="font-semibold mb-2">Doctor's Review</h3>
                                <div class="flex space-x-3 mb-4">
                                    <button @click="setIsChoosen" class="btn btn-primary text-white flex-1"
                                        :disabled="isChoosen || !selectedDiagnosis">
                                        Set Choosen Diseases
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <!-- Doctor Approval Section -->
                            <div class="pt-4 mt-4" :class="!isChoosen ? 'hidden' : ''">
                                <div class="mb-4">
                                    <div v-if="selectedDiagnosis != null && isChoosen">
                                        <div class="alert alert-info text-white">
                                            {{ selectedDiagnosis.disease }}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Feedback</span>
                                    </label>
                                    <textarea v-model="feedback" class="textarea w-full"
                                        placeholder="Add your feedback about predicted diseases" rows="3"
                                        :disabled="!isChoosen">
                                </textarea>
                                </div>

                                <button @click="submitAsMedicalRecord" class="btn btn-primary mt-3 w-full text-white"
                                    :disabled="!feedback">
                                    <div v-if="!isSubmitting">
                                        Submit Medical Record
                                    </div>
                                    <div v-else>
                                        <span class="loading loading-spinner"></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-gray-400 italic">
                        <div v-if="!isSubmitting">
                            No result yet. Please input symptoms first.
                        </div>
                        <div v-else>
                            <span class="loading loading-spinner"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Errors from '@/components/Modals/Errors.vue'
import { patchMedicalRecord } from '@/service/medicalrecord'
import { predictDiseases } from '@/service/prediction'
import { useVisitedStore } from '@/stores/queue'
import { ref, onUnmounted, computed, watch } from 'vue'
import Info from '@/components/Modals/Info.vue'
import { useRouter } from 'vue-router'

// Store
const visitedStore = useVisitedStore()

// Computed
const patient = computed(() => { return visitedStore.visited })

const symptom = ref('')
const prediction = ref(null)

const selectedDiagnosis = ref(null)
const feedback = ref(null)

const isSubmitting = ref(false)
const isListening = ref(false)
const isChoosen = ref(false)

const modalRef = ref()
const infoModal = ref()
const router = useRouter()

watch(isChoosen, (newValue, oldValue) => {
    if (newValue != oldValue) { window.scrollTo(0, 0) }
})

const submitForm = async () => {
    if (!symptom.value.trim()) return modalRef.value.show('Symptom is required.')
    reset()
    isSubmitting.value = true
    try {
        const response = await predictDiseases(symptom.value.trim())
        prediction.value = {
            predictions: response.data.data.predictions,
            recommendations: response.data.data.recommendations,
            symptoms: response.data.data.symptoms,
        }
    } catch (err) {
        modalRef.value.show(err.response.data.message || err.message || err)
    } finally {
        isSubmitting.value = false
    }
}

const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
        modalRef.value.show('Your browser does not support voice recognition')
        return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'id-ID'
    recognition.onresult = (event) => {
        symptom.value += event.results[0][0].transcript
        symptom.value += " "
        isListening.value = false
    }
    recognition.onerror = (event) => {
        modalRef.value.show('Voice recognition error: ' + event.error)
        isListening.value = false
    }
    recognition.start()
    isListening.value = true
}

const resetSymptom = () => {
    symptom.value = ''
    reset()
}

const reset = () => {
    prediction.value = null
    selectedDiagnosis.value = null
    feedback.value = null
    isChoosen.value = false
}

const calculateConfidence = (confidence) => { return Math.ceil(confidence * 100) }

const setIsChoosen = () => { isChoosen.value = true }

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

const submitAsMedicalRecord = async () => {
    patient.value.medical_record.diagnosis = selectedDiagnosis.value.disease
    patient.value.medical_record.predictions = JSON.stringify(prediction.value)
    patient.value.medical_record.feedback.response = feedback.value
    patient.value.medical_record.feedback.approved = selectedDiagnosis.value.disease !== "None of the predicted applies"
    patient.value.medical_record.patient.birth_date = formatDate(patient.value.medical_record.patient.birth_date)

    isSubmitting.value = true
    try {
        const response = await patchMedicalRecord(patient.value.medical_record.id, patient.value.medical_record)
        await infoModal.value.show(response.message || 'Medical Record Updated')
    } catch (err) {
        modalRef.value.show(err.response.data.message || err.message || err)
    } finally {
        isSubmitting.value = false
    }
}

function redirectBack() {
    router.push({ name: 'doctor.queuing' })
}

onUnmounted(() => {
    visitedStore.clearVisited()
})
</script>