<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Form Header -->
            <div class="bg-primary text-white p-4">
                <h2 class="text-2xl font-bold">
                    {{ isEditMode ? 'Edit Patient' : 'Register New Patient' }}
                </h2>
                <p class="text-sm opacity-90">
                    {{ isEditMode ? 'Update patient information' : 'Fill in the patient details' }}
                </p>
            </div>

            <form @submit.prevent="submitForm" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Medical Record -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Medical Record Number*</span>
                        </label>
                        <input v-model="patient.medicalRecord" type="text" class="input input-bordered w-full"
                            placeholder="Exist Medical Record" required />
                        <label class="label" v-if="v$.medicalRecord.$error">
                            <span class="label-text-alt text-error">{{ v$.medicalRecord.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Patient Name -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Full Name*</span>
                        </label>
                        <input v-model="patient.name" type="text" class="input input-bordered w-full"
                            placeholder="John Doe" required />
                        <label class="label" v-if="v$.name.$error">
                            <span class="label-text-alt text-error">{{ v$.name.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Date of Birth*</span>
                        </label>
                        <vue-date-picker v-model="patient.birthDate" :month-change-on-scroll="false"
                            model-type="yyyy-MM-dd" :max-date="new Date()" :enable-time-picker="false" auto-apply
                            placeholder="Select date"
                            :input-class="`input input-bordered w-full ${v$.birthDate.$error ? 'input-error' : ''}`"
                            :ui="{ input: '!w-full', menu: '!absolute' }" required />
                        <label class="label" v-if="v$.birthDate.$error">
                            <span class="label-text-alt text-error">{{ v$.birthDate.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Gender -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Gender*</span>
                        </label>
                        <select v-model="patient.gender" class="select select-bordered w-full"
                            :class="{ 'select-error': v$.gender.$error }" required>
                            <option disabled value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <label class="label" v-if="v$.gender.$error">
                            <span class="label-text-alt text-error">{{ v$.gender.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Additional Fields -->
                    <div class="form-control md:col-span-2">
                        <label class="label">
                            <span class="label-text font-medium">Contact Information</span>
                        </label>
                        <input v-model="patient.phone" type="tel" class="input input-bordered w-full"
                            placeholder="Phone number" disabled />
                    </div>

                    <div class="form-control md:col-span-2">
                        <label class="label">
                            <span class="label-text font-medium">Address</span>
                        </label>
                        <textarea v-model="patient.address" class="textarea textarea-bordered w-full"
                            placeholder="Patient address" rows="3" disabled></textarea>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6">
                    <router-link to="/patients" class="btn btn-outline btn-secondary sm:w-auto w-full">
                        Cancel
                    </router-link>
                    <button type="submit" class="btn btn-primary sm:w-auto w-full text-white" :disabled="isSubmitting">
                        <span v-if="!isSubmitting">
                            {{ isEditMode ? 'Update Patient' : 'Save Patient' }}
                        </span>
                        <span v-else class="loading loading-spinner"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePatientStore } from '@/stores/patient'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Errors from '@/components/Modals/Errors.vue'

const router = useRouter()
const route = useRoute()
const patientStore = usePatientStore()
const modalRef = ref()
const isSubmitting = ref(false)

const patient = ref({
    medicalRecord: '',
    name: '',
    gender: '',
    birthDate: null,
    phone: '',
    address: ''
})

const rules = {
    medicalRecord: {
        required: helpers.withMessage('Medical record number is required', required)
    },
    name: {
        required: helpers.withMessage('Patient name is required', required)
    },
    gender: {
        required: helpers.withMessage('Please select gender', required)
    },
    birthDate: {
        required: helpers.withMessage('Date of birth is required', required),
        validDate: helpers.withMessage(
            'Please enter a valid date',
            (value) => !value || !isNaN(new Date(value))
        )
    }
}

const v$ = useVuelidate(rules, patient)

const isEditMode = computed(() => route.name === 'patient-edit')

// Load patient data if in edit mode
onMounted(async () => {
    if (isEditMode.value) {
        try {
            const patientId = route.params.id
            const existingPatient = await patientStore.fetchPatientById(patientId)
            if (existingPatient) {
                patient.value = { ...existingPatient }
            }
        } catch (error) {
            modalRef.value.show(error.message)
        }
    }
})

async function submitForm() {
    const isValid = await v$.value.$validate()
    if (!isValid) return

    isSubmitting.value = true
    try {
        if (isEditMode.value) {
            await patientStore.updatePatient(patient.value)
        } else {
            await patientStore.createPatient(patient.value)
        }
        if (!patientStore.error) {
            router.push('/patients')
        } else {
            modalRef.value.show(patientStore.error)
        }
    } catch (error) {
        modalRef.value.show(error.message)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
.form-control {
    margin-bottom: 0.5rem;
}

.label {
    padding: 0 0 0.25rem 0;
}

.label-text {
    font-size: 0.875rem;
}

.input,
.select,
.textarea {
    transition: all 0.2s ease;
}

.input:focus,
.select:focus,
.textarea:focus {
    box-shadow: 0 0 0 2px hsl(var(--p) / 0.2);
}
</style>