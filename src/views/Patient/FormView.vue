<template>
  <!-- Page background -->
  <div class="p-6 bg-base-200 min-h-screen">
    <Errors ref="modalRef" />
    <Info ref="infoModal" @callback="redirectBack" />

    <div class="max-w-5xl mx-auto">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-1">
          {{ isEditMode ? 'Edit Patient' : 'Create New Patient' }}
        </h1>
        <p class="text-base-content/60">
          {{ isEditMode ? 'Update patient information' : 'Add a new patient to your clinic database' }}
        </p>
      </div>

      <!-- FORM CARD -->
      <div class="card bg-white shadow-xl border border-base-300/60">
        <div class="card-body p-10">

          <form @submit.prevent="submitForm" class="space-y-12">

            <!-- ================= MEDICAL INFO ================= -->
            <section>
              <div class="mb-8">
                <h2 class="text-xl font-semibold flex items-center gap-2">
                  <font-awesome-icon icon="file-medical" class="text-primary" />
                  Medical Information
                </h2>
                <p class="text-sm text-base-content/60">
                  Basic medical record data
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Medical Record Number*</span>
                  </label>
                  <input
                    v-model="patient.medical_record_number"
                    type="text"
                    placeholder="Ex: MR-00123"
                    class="input input-bordered w-full bg-base-100"
                  />
                  <label class="label" v-if="v$.medical_record_number.$error">
                    <span class="label-text-alt text-error">
                      {{ v$.medical_record_number.$errors[0]?.$message }}
                    </span>
                  </label>
                </div>
              </div>
            </section>

            <!-- divider -->
            <div class="divider"></div>

            <!-- ================= PERSONAL INFO ================= -->
            <section>
              <div class="mb-8">
                <h2 class="text-xl font-semibold flex items-center gap-2">
                  <font-awesome-icon icon="user" />
                  Personal Information
                </h2>
                <p class="text-sm text-base-content/60">
                  Patient identity details
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Name -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Full Name*</span>
                  </label>
                  <input
                    v-model="patient.name"
                    type="text"
                    placeholder="John Doe"
                    class="input input-bordered w-full bg-base-100"
                  />
                  <label class="label" v-if="v$.name.$error">
                    <span class="label-text-alt text-error">
                      {{ v$.name.$errors[0]?.$message }}
                    </span>
                  </label>
                </div>

                <!-- Birth Date -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Date of Birth*</span>
                  </label>
                  <input
                    v-model="patient.birth_date"
                    type="date"
                    class="input input-bordered w-full bg-base-100"
                  />
                  <label class="label" v-if="v$.birth_date.$error">
                    <span class="label-text-alt text-error">
                      {{ v$.birth_date.$errors[0]?.$message }}
                    </span>
                  </label>
                </div>

                <!-- Gender -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Gender*</span>
                  </label>
                  <select
                    v-model="patient.gender"
                    class="select select-bordered w-full bg-base-100"
                  >
                    <option disabled value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label class="label" v-if="v$.gender.$error">
                    <span class="label-text-alt text-error">
                      {{ v$.gender.$errors[0]?.$message }}
                    </span>
                  </label>
                </div>

              </div>
            </section>

            <!-- divider -->
            <div class="divider"></div>

            <!-- ================= ADDITIONAL ================= -->
            <section>
              <h2 class="text-lg font-semibold mb-6">
                Additional Fields (Coming Soon)
              </h2>

              <div class="grid grid-cols-1 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Phone</span>
                  </label>
                  <input
                    type="tel"
                    class="input input-bordered w-full bg-base-200"
                    placeholder="Phone number"
                    disabled
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Address</span>
                  </label>
                  <textarea
                    rows="3"
                    class="textarea textarea-bordered w-full bg-base-200"
                    placeholder="Patient address"
                    disabled
                  ></textarea>
                </div>
              </div>
            </section>

            <!-- ================= ACTION BUTTONS ================= -->
            <div class="pt-6 border-t border-base-300/60 flex justify-end gap-3">
              <router-link to="/patients" class="btn btn-ghost">
                Cancel
              </router-link>

              <button type="submit" class="btn btn-primary text-white">
                <span v-if="!isSubmitting">
                  {{ isEditMode ? 'Update Patient' : 'Save Patient' }}
                </span>
                <span v-else class="loading loading-spinner"></span>
              </button>
            </div>

          </form>

        </div>
      </div>
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
import Info from '@/components/Modals/Info.vue'

const router = useRouter()
const route = useRoute()
const patientStore = usePatientStore()
const modalRef = ref()
const isSubmitting = ref(false)
const infoModal = ref()

const patient = ref({
    medical_record_number: '',
    name: '',
    gender: '',
    birth_date: null,
    phone: '',
    address: ''
})

const rules = {
    medical_record_number: {
        required: helpers.withMessage('Medical record number is required', required)
    },
    name: {
        required: helpers.withMessage('Patient name is required', required)
    },
    gender: {
        required: helpers.withMessage('Please select gender', required)
    },
    birth_date: {
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
        let success
        if (isEditMode.value) {
            success = await patientStore.updatePatient(patient.value)
        } else {
            success = await patientStore.createPatient(patient.value)
        }
        if (success) {
            await infoModal.value.show('Patient Added Successfully')
        } else {
            modalRef.value.show(patientStore.error || 'Something went wrong')
        }
    } catch (error) {
        modalRef.value.show(error.message)
    } finally {
        isSubmitting.value = false
    }
}

function redirectBack() {
    router.push({ name: 'patients' })
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