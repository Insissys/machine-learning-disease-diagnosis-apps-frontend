<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Header -->
            <div class="bg-primary text-white p-4">
                <h2 class="text-2xl font-bold">Patient Registration</h2>
                <p class="text-sm opacity-90">Register new patients for doctor visits</p>
            </div>

            <!-- Form Navigation -->
            <div class="tabs tabs-boxed bg-base-200 px-4 pt-4">
                <a class="tab" :class="{ 'tab-active': activeTab === 'exist-patient' }"
                    @click="activeTab = 'exist-patient'">
                    Register Existing Patient
                </a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'register-new' }"
                    @click="activeTab = 'register-new'">
                    Register New Patient
                </a>
            </div>

            <!-- Main Content -->
            <div class="p-6">
                <!-- Search Existing Patients -->
                <div v-if="activeTab === 'exist-patient'" class="space-y-6">
                    <!-- Search Field -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div class="form-control">
                            <input v-model="patientStore.search" type="text" placeholder="Search"
                                class="input input-bordered w-full">
                        </div>
                    </div>

                    <!-- Patient List -->
                    <div class="overflow-x-auto border rounded-lg">
                        <table class="table w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="w-1/6">Medical Record</th>
                                    <th class="w-2/6">Patient Name</th>
                                    <th class="w-1/6">Gender</th>
                                    <th class="w-1/6">Date of Birth</th>
                                    <th class="w-1/6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="patient in paginatedPatients" :key="patient.id"
                                    class="hover:bg-gray-50 transition-colors">
                                    <td>{{ patient.medicalRecord }}</td>
                                    <td>{{ patient.name }}</td>
                                    <td>
                                        <span
                                            :class="`badge ${patient.gender.toLowerCase() === 'male' ? 'badge-info' : 'badge-secondary'} text-white`">
                                            {{ patient.gender }}
                                        </span>
                                    </td>
                                    <td>{{ patient.birthDate }}</td>
                                    <td class="text-right">
                                    </td>
                                </tr>
                                <tr v-if="patientStore.filteredPatients.length === 0">
                                    <td colspan="5" class="text-center py-8">
                                        <div class="flex flex-col items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                    <!-- Form Actions -->
                    <div class="flex flex-col sm:flex-row justify-end space-x-2 mt-4">
                        <router-link to="/registrations" class="btn btn-outline btn-secondary sm:w-auto w-full mb-2">
                            Cancel
                        </router-link>
                    </div>
                </div>

                <!-- New Patient Form (Conditional) -->
                <div v-if="activeTab === 'register-new'" class="space-y-6">
                    <h3 class="text-lg font-semibold mb-4">
                        {{ editingPatient ? 'Edit Patient' : 'New Patient Registration' }}</h3>

                    <form @submit.prevent="savePatient">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Medical Record -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Medical Record Number*</span>
                                </label>
                                <input v-model="patient.medicalRecord" type="text" class="input input-bordered w-full"
                                    placeholder="Exist Medical Record" />
                                <label class="label" v-if="v$.medicalRecord.$error">
                                    <span class="label-text-alt text-error">{{ v$.medicalRecord.$errors[0]?.$message
                                    }}</span>
                                </label>
                            </div>

                            <!-- Patient Name -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Full Name*</span>
                                </label>
                                <input v-model="patient.name" type="text" class="input input-bordered w-full"
                                    placeholder="John Doe" />
                                <label class="label" v-if="v$.name.$error">
                                    <span class="label-text-alt text-error">{{ v$.name.$errors[0]?.$message }}</span>
                                </label>
                            </div>

                            <!-- Date of Birth -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Date of Birth*</span>
                                </label>
                                <input v-model="patient.birthDate" type="date" class="input input-bordered w-full"
                                    required>
                                <label class="label" v-if="v$.birthDate.$error">
                                    <span class="label-text-alt text-error">{{ v$.birthDate.$errors[0]?.$message
                                    }}</span>
                                </label>
                            </div>

                            <!-- Gender -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">Gender*</span>
                                </label>
                                <select v-model="patient.gender" class="select select-bordered w-full"
                                    :class="{ 'select-error': v$.gender.$error }">
                                    <option disabled value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label class="label" v-if="v$.gender.$error">
                                    <span class="label-text-alt text-error">{{ v$.gender.$errors[0]?.$message }}</span>
                                </label>
                            </div>

                            <div class="divider md:col-span-2">Additional Fields</div>

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
                        <div class="flex flex-col sm:flex-row justify-end space-x-2 mt-4">
                            <router-link to="/registrations"
                                class="btn btn-outline btn-secondary sm:w-auto w-full mb-2">
                                Cancel
                            </router-link>
                            <button type="button" @click="resetPatientForm"
                                class="btn btn-outline btn-error sm:w-auto w-full mb-2 hover:text-white">
                                Reset
                            </button>
                            <button type="submit" class="btn btn-primary text-white sm:w-auto w-full mb-2">
                                {{ editingPatient ? 'Update' : 'Save' }} Patient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePatientStore } from '@/stores/patient'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { ref, onMounted, computed } from 'vue'

// Store data
const patientStore = usePatientStore()

// Reactive data
const editingPatient = ref(null)
const activeTab = ref('exist-patient')
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 8

const patient = ref({
    medicalRecord: '',
    name: '',
    gender: '',
    birthDate: '',
    phone: '',
    address: '',
    status: '',
})

// Computed properties
const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return patientStore.filteredPatients.slice(start, end)
})

// Validation
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

// Methods
async function loadPatients() {
    if (patientStore.isLoading) return

    try {
        await patientStore.fetchAllPatients()
    } catch (err) {
        modalRef.value.show(err)
    }
}

const resetPatientForm = () => {
    patient.value = {
        medicalRecord: '',
        name: '',
        gender: '',
        birthDate: '',
        phone: '',
        address: '',
        status: '',
    }
}

// Lifecycle hooks
onMounted(() => {
    loadPatients()
})
</script>