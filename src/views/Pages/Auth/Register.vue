<template>
    <div class="h-screen flex">
        <!-- Left (Form Section) -->
        <div class="hidden md:flex items-center justify-center w-1/2 bg-base-200 p-10">
            <img src="/src/assets/images/ilusstration2.svg" alt="Login illustration" class="max-w-xl" />
            <a href="https://storyset.com/phone"
                class="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Phone illustrations by Storyset
            </a>
        </div>

        <!-- Right (Image Section) -->
        <div class="flex items-center justify-center w-full md:w-1/2 bg-white">
            <form @submit.prevent="register" class="bg-white p-8 rounded w-full max-w-sm">
                <h2 class="text-2xl font-semibold mb-6 text-center">Sign-up</h2>

                <Errors ref="modalRef" />

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Office Name</label>
                    <input v-model="officename" type="text" placeholder="Enter your office name" class="input w-full"
                        required />
                </div>

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Address</label>
                    <textarea v-model="address" class="textarea textarea-bordered w-full resize-none"
                        placeholder="Enter your office address" required></textarea>
                </div>

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Name</label>
                    <input v-model="name" type="text" placeholder="Enter your name" class="input w-full" required />
                </div>

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email" class="input w-full" required />
                </div>

                <div class="mb-6">
                    <label class="block mb-1 text-sm font-medium">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password" class="input w-full"
                        required />
                </div>

                <div class="mb-6">
                    <label class="block mb-1 text-sm font-medium">Confirm Password</label>
                    <input v-model="confirmpassword" type="password" placeholder="Enter your password"
                        class="input w-full" required />
                </div>

                <button class="btn bg-red-500 w-full text-white" :disab:disabled="isLoading" led="isLoading">
                    <span v-if="!isLoading">Submit</span>
                    <span v-else class="loading loading-spinner loading-sm"></span>
                </button>

                <!-- link under the button -->
                <p class="text-sm mt-4 text-center">
                    Already have an account?
                    <router-link to="/login" class="text-blue-600 hover:underline font-medium">
                        Sign in instead
                    </router-link>
                </p>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Errors from '@/components/Modals/Errors.vue'
import { useAuthStore } from '@/stores/auth'

const officename = ref('')
const address = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')

const modalRef = ref()
const router = useRouter()
const isLoading = ref(false)
const authStore = useAuthStore()

const register = async () => {
    if (isLoading.value) return
    if (password.value != confirmpassword.value) {
        modalRef.value.show("Password not same")
        return
    }
    isLoading.value = true

    try {
        const payload = {}

        payload.officename = officename.value
        payload.address = address.value
        payload.name = name.value
        payload.email = email.value
        payload.password = password.value

        await authStore.register(payload)
        router.push('/login')
    } catch (err) {
        modalRef.value.show(err.response?.data?.message || err)
        isLoading.value = false
    }
}
</script>
