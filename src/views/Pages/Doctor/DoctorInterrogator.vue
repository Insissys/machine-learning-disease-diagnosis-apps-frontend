<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Patient Symptom Input Form -->
            <div class="bg-white rounded shadow-md p-6">
                <h2 class="text-2xl font-bold mb-4">Symptom Input</h2>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">Medical Record</label>
                    <input v-model="patient.medicalRecord" class="input input-bordered w-full" disabled />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">Patient Name</label>
                    <input v-model="patient.name" class="input input-bordered w-full" disabled />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">Birth Day</label>
                    <input v-model="patient.birthDate" class="input input-bordered w-full" disabled />
                </div>

                <div class="mb-4">
                    <label class="block font-semibold mb-1">Input Symptom</label>
                    <textarea v-model="symptom" class="textarea textarea-bordered w-full"
                        placeholder="Describe symptoms..."></textarea>
                </div>

                <div class="mb-4">
                    <button class="btn btn-secondary" @click="startVoiceInput">🎙 Voice</button>
                    <button class="btn btn-primary" @click="saveSymptom">Save</button>
                </div>
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