<template>
    <div class="h-screen flex">
        <!-- Left (Form Section) -->
        <div class="hidden md:flex items-center justify-center w-1/2 bg-base-200 p-10">
            <img src="/src/assets/images/ilusstration.svg" alt="Login illustration" class="max-w-xl" />
            <a href="https://storyset.com/mobile"
                class="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Mobile illustrations by Storyset
            </a>
        </div>

        <!-- Right (Image Section) -->
        <div class="flex items-center justify-center w-full md:w-1/2 bg-white">
            <form @submit.prevent="login" class="bg-white p-8 rounded w-full max-w-sm">
                <h2 class="text-2xl font-semibold mb-6 text-center">Sign-up</h2>

                <div v-if="auth.error" class="text-red-500 text-sm mb-4 text-center">
                    {{ auth.error }}
                </div>

                <div class="mb-4">
                    <label class="block mb-1 text-sm font-medium">Name</label>
                    <input v-model="name" type="text" placeholder="Enter your name" class="input input-bordered w-full"
                        required />
                </div>

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

                <button class="btn btn-primary w-full">Submit</button>

                <!-- link under the button -->
                <p class="text-sm mt-4 text-center">
                    Already have an account?
                    <a href="/login" class="text-blue-600 hover:underline font-medium">
                        Sign in instead
                    </a>
                </p>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const email = ref('')
const password = ref('')
const error = ref(null)
const auth = useAuthStore()
const router = useRouter()

const login = async () => {
    try {
        await auth.login(email.value, password.value)
        router.push('/dashboard')
    } catch (err) {
        error.value = auth.error
    }
}
</script>
