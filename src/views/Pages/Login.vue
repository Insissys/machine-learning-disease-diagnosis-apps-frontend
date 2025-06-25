<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 class="text-2xl font-semibold mb-4">Login</h2>
            <div class="mb-4">
                <div v-if="auth.error" class="text-red-500">{{ auth.error }}</div>
            </div>
            <div class="mb-4">
                <label class="block mb-1">Email</label>
                <input v-model="email" type="email" placeholder="Enter your email"
                    class="w-full px-4 py-2 border rounded" required />
            </div>
            <div class="mb-4">
                <label class="block mb-1">Password</label>
                <input v-model="password" type="password" placeholder="Enter your password"
                    class="w-full px-4 py-2 border rounded" required />
            </div>
            <button class="btn bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        </form>
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
