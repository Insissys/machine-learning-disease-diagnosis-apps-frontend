<template>
    <div class="h-screen flex">
        <!-- Left (Form Section) -->
        <div class="flex items-center justify-center w-full md:w-1/2 bg-white">
            <form @submit.prevent="login" class="bg-white p-8 rounded w-full max-w-sm">
                <h2 class="text-2xl font-semibold mb-6 text-center">Sign-in</h2>

                <Errors ref="modalRef" />

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email"
                        class="input input-bordered w-full" required />
                </div>

                <div class="mb-6">
                    <label class="block mb-1 text-sm font-medium">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password"
                        class="input input-bordered w-full" required />
                </div>

                <button class="btn btn-primary w-full text-base-content" :disab:disabled="isLoading" led="isLoading">
                    <span v-if="!isLoading">Login</span>
                    <span v-else class="loading loading-spinner loading-sm"></span>
                </button>

                <!-- link under the button -->
                <p class="text-sm mt-4 text-center">
                    Don't have an account?
                    <router-link to="/register" class="text-blue-600 hover:underline font-medium">
                        Sign up instead
                    </router-link>
                </p>
            </form>
        </div>

        <!-- Right (Image Section) -->
        <div class="hidden md:flex items-center justify-center w-1/2 bg-base-200 p-10">
            <img src="/src/assets/images/ilusstration.svg" alt="Login illustration" class="max-w-xl" />
            <a href="https://storyset.com/mobile"
                class="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Mobile illustrations by Storyset
            </a>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Errors from '@/components/Modals/Errors.vue'
import { useProfileStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const modalRef = ref()
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const userStore = useProfileStore()

const login = async () => {
    if (isLoading.value) return
    isLoading.value = true

    try {
        await authStore.login(email.value, password.value)
        await userStore.fetchProfile()
        router.push('/dashboard')
    } catch (err) {
        modalRef.value.show(err.response?.data?.message || err)
        isLoading.value = false
    }
}
</script>
