<template>
    <div class="min-h-screen bg-gradient-to-br from-base-200/60 via-base-200/40 to-base-100 p-8">
        <Info ref="infoModal" @callback="redirectBack"/>

        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="mb-6 flex items-start justify-between">
                <div>
                    <h1 class="text-3xl font-bold flex items-center gap-3">
                        <font-awesome-icon icon="clipboard-list" class="text-primary text-2xl" />
                        Patient Registration
                    </h1>
                    <p class="text-base-content/60 mt-1">
                        Register patients for doctor consultation
                    </p>
                    <div class="h-1 w-16 bg-primary rounded-full mt-3"></div>
                </div>
                <div class="hidden md:flex items-center gap-3">
                    <div class="px-4 py-2 bg-base-100 border border-base-300/60 rounded-xl shadow-sm text-sm">
                        <span class="text-base-content/60">Total Patients</span>
                        <div class="font-semibold text-primary">
                            {{ patientStore.filteredPatients.length }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Navigation -->
            <div class="mb-8">
                <div class="relative inline-flex rounded-xl bg-base-200 p-1 shadow-sm border border-base-300/40">
                    <div
                        class="absolute top-1 bottom-1 w-1/2 bg-base-100 rounded-lg shadow transition-all duration-300"
                        :class="activeTab === 'exist-patient' ? 'left-1' : 'left-1/2'"
                    ></div>
                    <button
                        class="relative z-10 px-6 py-2 text-sm font-medium transition"
                        :class="activeTab === 'exist-patient' 
                            ? 'text-primary' 
                            : 'text-base-content/60 hover:text-base-content'"
                        @click="activeTab = 'exist-patient'"
                    >
                        Existing Patient
                    </button>

                    <button
                        class="relative z-10 px-6 py-2 text-sm font-medium"
                        :class="activeTab === 'register-new' 
                            ? 'text-primary' 
                            : 'text-base-content/60 hover:text-base-content'"
                        @click="activeTab = 'register-new'"
                    >
                        New Registration
                    </button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="card bg-white bg-base-100/90 backdrop-blur border border-base-300/60 shadow-xl rounded-2xl animate-fade-in">
                <div class="card-body p-8">
                    <!-- Search Existing Patients -->
                    <div v-if="activeTab === 'exist-patient'" class="space-y-6">
                        <!-- Search Field -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                            <div class="max-w-sm">
                                <div class="relative">
                                    <input
                                        v-model="patientStore.search"
                                        type="text"
                                        placeholder="Search patient..."
                                        class="input input-bordered w-full pl-10"
                                    />
                                    <span class="absolute left-3 top-2.5 opacity-50">🔍</span>
                                </div>
                            </div>
                        </div>
    
                        <!-- Patient List -->
                        <div class="overflow-x-auto rounded-2xl border border-base-300/60 shadow-sm">
                            <table class="table w-full">
                                <thead class="bg-base-200/60 text-sm uppercase tracking-wide text-base-content/60">
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
                                        class="hover:bg-base-200/40 hover:shadow-sm transition duration-200">
                                        <td>{{ patient.medical_record_number }}</td>
                                        <td>{{ patient.name }}</td>
                                        <td>
                                            <span
                                                :class="`badge ${patient.gender.toLowerCase() === 'male' ? 'badge-info' : 'badge-secondary'} text-white`">
                                                {{ patient.gender }}
                                            </span>
                                        </td>
                                        <td>{{ formatDate(patient.birth_date) }}</td>
                                        <td class="text-right">
                                            <button @click="selectPatient(patient)"
                                                class="btn btn-sm btn-outline btn-primary hover:bg-primary hover:text-white transition">Register</button>
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
                        <div class="flex justify-between items-center pt-6 border-t border-base-300/60 text-sm text-base-content/60">
                            <div>
                                Showing {{ paginatedPatients.length }} of {{ patientStore.filteredPatients.length }} patients
                            </div>

                            <div class="flex gap-2">
                                <button class="btn btn-xs btn-outline">Previous</button>
                                <button class="btn btn-xs btn-outline">Next</button>
                            </div>
                        </div>
    
                        <!-- Form Actions -->
                        <div class="flex justify-end pt-6 border-t border-base-300/60"></div>
                        <div class="flex flex-col sm:flex-row justify-end space-x-2 mt-4">
                            <router-link to="/registrations" class="btn btn-outline btn-secondary sm:w-auto w-full mb-2">
                                Cancel
                            </router-link>
                        </div>
                    </div>
    
                    <!-- New Patient Form (Conditional) -->
                    <div v-if="activeTab === 'register-new'" class="space-y-10">
                        <form @submit.prevent="savePatient">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <!-- Medical Record -->
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Medical Record Number*</span>
                                    </label>
                                    <input v-model="registration.medical_record.medical_record_number" type="text"
                                        class="input input-bordered w-full focus:input-primary" placeholder="Exist Medical Record"
                                        :disabled="patientSelected" />
                                    <label class="label" v-if="v$.medical_record.medical_record_number.$error">
                                        <span class="label-text-alt text-error">
                                            {{ v$.medical_record.medical_record_number.$errors[0]?.$message }}
                                        </span>
                                    </label>
                                </div>
    
                                <!-- Patient Name -->
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Full Name*</span>
                                    </label>
                                    <input v-model="registration.medical_record.patient.name" type="text"
                                        class="input input-bordered w-full focus:input-primary" placeholder="John Doe" :disabled="patientSelected" />
                                    <label class="label" v-if="v$.medical_record.patient.name.$error">
                                        <span class="label-text-alt text-error">
                                            {{ v$.medical_record.patient.name.$errors[0]?.$message }}
                                        </span>
                                    </label>
                                </div>
    
                                <!-- Date of Birth -->
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Date of Birth*</span>
                                    </label>
                                    <input v-model="registration.medical_record.patient.birth_date" type="date"
                                        class="input input-bordered w-full focus:input-primary" :disabled="patientSelected" />
                                    <label class="label" v-if="v$.medical_record.patient.birth_date.$error">
                                        <span class="label-text-alt text-error">
                                            {{ v$.medical_record.patient.birth_date.$errors[0]?.$message }}
                                        </span>
                                    </label>
                                </div>
    
                                <!-- Gender -->
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Gender*</span>
                                    </label>
                                    <select v-model="registration.medical_record.patient.gender" class="select select-bordered w-full focus:select-primary"
                                        :disabled="patientSelected">
                                        <option disabled value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label class="label" v-if="v$.medical_record.patient.gender.$error">
                                        <span class="label-text-alt text-error">
                                            {{ v$.medical_record.patient.gender.$errors[0]?.$message }}
                                        </span>
                                    </label>
                                </div>
    
                                <!-- Interrogator -->
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">Select a Doctor*</span>
                                    </label>
                                    <div class="join w-full">
                                        <select v-model="registration.medical_record.interrogator.id" class="select select-bordered w-full focus:select-primary">
                                            <option disabled value="">Select doctor</option>
                                            <option v-for="user in userStore.users" :key="user.id" :value="user.id">{{ user.name }}</option>
                                        </select>
                                        <button type="button" class="btn btn-primary text-white" @click="loadUsers">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 4v5h.582M20 20v-5h-.581M5.64 17.657A9 9 0 105.64 6.343M5.64 6.343L4 4m16 16l-1.641-1.657" />
                                            </svg>
                                        </button>
                                    </div>
                                    <label class="label" v-if="v$.medical_record.interrogator.id.$error">
                                        <span class="label-text-alt text-error">
                                            {{ v$.medical_record.interrogator.id.$errors[0]?.$message }}
                                        </span>
                                    </label>
                                </div>
    
                                <div class="divider md:col-span-2">Additional Fields (Coming Soon)</div>
    
                                <!-- Additional Fields -->
                                <div class="form-control md:col-span-2">
                                    <label class="label">
                                        <span class="label-text font-medium">Contact Information</span>
                                    </label>
                                    <input v-model="registration.medical_record.patient.phone" type="tel"
                                        class="input input-bordered w-full focus:input-primary" placeholder="Phone number" disabled />
                                </div>
    
                                <div class="form-control md:col-span-2">
                                    <label class="label">
                                        <span class="label-text font-medium">Address</span>
                                    </label>
                                    <textarea v-model="registration.medical_record.patient.address"
                                        class="textarea textarea-bordered w-full focus:textarea-primary" placeholder="Patient address" rows="3"
                                        disabled></textarea>
                                </div>
                            </div>
    
                            <!-- Form Actions -->
                            <div class="flex justify-end pt-6 border-t border-base-300/60"></div>
                            <div class="flex justify-end gap-3 pt-6 border-t border-base-300">
                                <router-link to="/registrations"
                                    class="btn btn-outline">
                                    Cancel
                                </router-link>
                                <button type="button" @click="resetPatientForm"
                                    class="btn btn-outline btn-error">
                                    Reset
                                </button>
                                <button type="submit" class="btn btn-primary text-white shadow-md hover:shadow-lg transition-all">
                                    {{ editingPatient ? 'Update' : 'Save' }} Registration
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePatientStore } from '@/stores/patient'
import { useUserStore } from '@/stores/user'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { ref, onMounted, computed } from 'vue'
import Info from '@/components/Modals/Info.vue'
import { useRegistrationStore } from '@/stores/registration'
import { useRouter } from 'vue-router'

// Store data
const patientStore = usePatientStore()
const userStore = useUserStore()
const RegistrationStore = useRegistrationStore()

// Reactive data
const selectedPatientId = ref(null)
const editingPatient = ref(null)
const activeTab = ref('exist-patient')
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 8
const patientSelected = ref(false)
const isSubmitting = ref(false)
const isEditMode = ref(false)
const infoModal = ref()
const router = useRouter()

const registration = ref({
    medical_record: {
        id: '',
        medical_record_number: '',
        patient: {
            id: '',
            name: '',
            gender: '',
            birth_date: null,
            phone: '',
            address: ''
        },
        interrogator: {
            id: '',
        },
    }
})

// Computed properties
const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return patientStore.filteredPatients.slice(start, end)
})

// Validation
const rules = {
    medical_record: {
        medical_record_number: {
            required: helpers.withMessage('Medical record is required', required)
        },
        patient: {
            name: {
                required: helpers.withMessage('Patient name is required', required)
            },
            gender: {
                required: helpers.withMessage('Patient gender is required', required)
            },
            birth_date: {
                required: helpers.withMessage('Date of birth is required', required),
                validDate: helpers.withMessage(
                    'Please enter a valid date',
                    (value) => !value || !isNaN(new Date(value))
                )
            },
        },
        interrogator: {
            id: {
                required: helpers.withMessage('Doctor is required', required)
            }
        }
    },
}

const v$ = useVuelidate(rules, registration)

// Methods
async function loadPatients() {
    if (patientStore.isLoading) return

    try {
        await patientStore.fetchAllPatients()
    } catch (err) {
        modalRef.value.show(err || err.message || 'Something went wrong')
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
}

const resetPatientForm = () => {
    patientSelected.value = false
    registration.value = {
        medical_record: {
            medical_record_number: '',
            patient: {
                id: '',
                name: '',
                gender: '',
                birth_date: null,
                phone: '',
                address: ''
            },
            interrogator: {
                id: '',
            },
        }
    }
}

function selectPatient(patient) {
    patientSelected.value = true
    activeTab.value = 'register-new'

    registration.value = {
        medical_record: {
            id: '',
            medical_record_number: patient.medical_record_number,
            patient: {
                id: patient.id,
                name: patient.name,
                gender: patient.gender,
                birth_date: formatDate(patient.birth_date),
                phone: '',
                address: ''
            },
            interrogator: {
                id: '',
            },
        }
    }
}

async function loadUsers() {
    try {
        await userStore.fetchUsersDoctor()
    } catch (error) {
        modalRef.value.show(error || error.message || 'Something went wrong')
    }
}

async function savePatient() {
    const isValid = await v$.value.$validate()
    if (!isValid) return

    isSubmitting.value = true

    try {
        let success
        if (isEditMode.value) {
            // success = await RegistrationStore.updateRegistration(registration.value)
        } else {
            success = await RegistrationStore.createRegistration(registration.value)
        }
        if (success) {
            await infoModal.value.show('Registration Added Successfully')
        } else {
            modalRef.value.show(RegistrationStore.error || 'Something went wrong')
        }
    } catch (error) {
        console.error(error)
        // modalRef.value.show(error.message || 'Something went wrong')
    } finally {
        isSubmitting.value = false
    }
}

function redirectBack() {
    router.push({ name: 'registrations' })
}

// Lifecycle hooks
onMounted(() => {
    loadPatients()
    loadUsers()
})
</script>