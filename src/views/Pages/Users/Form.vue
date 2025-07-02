<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Info ref="modalInfo" />
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Form Header -->
            <div class="bg-primary text-white p-4">
                <h2 class="text-2xl font-bold">
                    {{ isEditMode ? 'Edit User' : 'Create New User' }}
                </h2>
                <p class="text-sm opacity-90">
                    {{ isEditMode ? 'Update user information' : 'Fill in the user details' }}
                </p>
            </div>

            <form @submit.prevent="submitForm" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Name -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Full Name*</span>
                        </label>
                        <input v-model="user.name" type="text" class="input input-bordered w-full"
                            placeholder="John Doe" />
                        <label class="label" v-if="v$.name.$error">
                            <span class="label-text-alt text-error">{{ v$.name.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Email -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Email*</span>
                        </label>
                        <input v-model="user.email" type="text" class="input input-bordered w-full"
                            placeholder="user@example.com" />
                        <label class="label" v-if="v$.email.$error">
                            <span class="label-text-alt text-error">{{ v$.email.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Password (only for new users) -->
                    <div class="form-control" v-if="!isEditMode">
                        <label class="label">
                            <span class="label-text font-medium">Password*</span>
                        </label>
                        <input v-model="user.password" type="password" class="input input-bordered w-full"
                            placeholder="••••••••" />
                        <label class="label" v-if="v$.password.$error">
                            <span class="label-text-alt text-error">{{ v$.password.$errors[0]?.$message }}</span>
                        </label>
                    </div>

                    <!-- Role -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Role*</span>
                        </label>
                        <select v-model="user.role" class="select select-bordered w-full"
                            :class="{ 'select-error': v$.role.$error }">
                            <option disabled value="">Select role</option>
                            <option value="admin">Administrator</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        <label class="label" v-if="v$.role.$error">
                            <span class="label-text-alt text-error">{{ v$.role.$errors[0]?.$message }}</span>
                        </label>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6">
                    <router-link to="/users" class="btn btn-outline btn-secondary sm:w-auto w-full">
                        Cancel
                    </router-link>
                    <button type="submit" class="btn btn-primary sm:w-auto w-full text-white" :disabled="isSubmitting">
                        <span v-if="!isSubmitting">
                            {{ isEditMode ? 'Update User' : 'Create User' }}
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
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import Errors from '@/components/Modals/Errors.vue'
import Info from '@/components/Modals/Info.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const modalRef = ref()
const modalInfo = ref()
const isSubmitting = ref(false)
const userStore = useUserStore()

const user = ref({
    name: '',
    email: '',
    password: '',
    role: '',
    status: '',
    phone: ''
})

const rules = {
    name: {
        required: helpers.withMessage('Full name is required', required)
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Please enter a valid email', email)
    },
    password: {
        required: helpers.withMessage('Password is required', required)
    },
    role: {
        required: helpers.withMessage('Role is required', required)
    }
}

const v$ = useVuelidate(rules, user)

const isEditMode = computed(() => route.name === 'edit')

onMounted(async () => {
    // if (isEditMode.value) {
    //     try {
    //         const userId = route.params.id
    //         const existingPatient = await patientStore.fetchPatientById(patientId)
    //         if (existingPatient) {
    //             patient.value = { ...existingPatient }
    //         }
    //     } catch (error) {
    //         modalRef.value.show(error.message)
    //     }
    // }
})

async function submitForm() {
    const isValid = await v$.value.$validate()
    if (!isValid) return

    isSubmitting.value = true
    try {
        if (isEditMode.value) {
            await userStore.updateUser(user.value)
        } else {
            await userStore.createUser(user.value)
        }
        modalInfo.value.show('User saved successfully!')
        setTimeout(() => {
            router.push('/users')
        }, 1000)
    } catch (error) {
        modalRef.value.show(error.message || error)
    } finally {
        isSubmitting.value = false
    }
}
</script>