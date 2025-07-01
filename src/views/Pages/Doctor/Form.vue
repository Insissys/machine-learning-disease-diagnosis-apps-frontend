<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <!-- Form Header -->
                <div class="bg-primary text-white p-4">
                    <h2 class="text-2xl font-bold">
                        Symptoms Input
                    </h2>
                    <p class="text-sm opacity-90">
                        Describe the symptoms bellow
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
                            <input v-model="patient.name" type="text" class="input input-bordered w-full" disabled />
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
                            <input v-model="patient.birthDate" type="text" class="input input-bordered w-full"
                                disabled />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">Input Symptomps</span>
                            </label>
                            <textarea v-model="symptom" class="textarea textarea-bordered w-full resize-none"
                                placeholder="Describe symptoms..."></textarea>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6">
                        <button @click="startVoiceInput" class="btn btn-primary sm:w-auto w-full text-white">
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
            <!-- ML Diagnosis Result -->
            <div class="bg-white rounded shadow-md p-6">
                <h2 class="text-2xl font-bold mb-4">Diagnosis Result</h2>
                <div v-if="mlResult">
                    <ul class="list-disc list-inside">
                        <li v-for="(item, index) in mlResult" :key="index">{{ item }}</li>
                    </ul>
                </div>
                <div v-else class="text-gray-400 italic">No result yet. Please input symptoms first.</div>
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

const patient = ref({
    name: '',
    medicalRecord: '',
    birthDate: ''
})

onMounted(() => {
    const id = route.params.id
    // Fetch patient by ID. Replace with API call.
    if (id === '1') {
        patient.value = { id: 1, name: 'John Smith', medicalRecord: 'MR001', birthDate: '1990-01-01' }
    } else if (id === '2') {
        patient.value = { id: 2, name: 'Jane Doe', medicalRecord: 'MR002', birthDate: '1985-05-12' }
    }
})

const saveSymptom = async () => {
    if (!symptom.value.trim()) return alert('Symptom is required.')
    console.log('Saved symptom:', symptom.value)
    mlResult.value = ['Possible: Flu', 'Recommendation: Rest, hydrate, consult in 3 days']
}

const startVoiceInput = () => {
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
</script>