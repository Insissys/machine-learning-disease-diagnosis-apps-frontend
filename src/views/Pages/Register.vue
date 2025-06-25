<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <form @submit.prevent="register" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 class="text-2xl font-semibold mb-4">Register</h2>
            <div class="mb-4">
                <label class="block mb-1">Full Name</label>
                <input v-model="name" type="text" placeholder="Full Name" class="w-full px-4 py-2 border rounded"
                    required />
            </div>
            <div class="mb-4">
                <label class="block mb-1">Email</label>
                <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded"
                    required />
            </div>
            <div class="mb-4">
                <label class="block mb-1">Password</label>
                <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-2 border rounded"
                    required />
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('doctor')
const register = async () => {
    // call REST API to register
}
</script>