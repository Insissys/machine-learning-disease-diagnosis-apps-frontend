<template>
    <Errors ref="modalRef" />
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="text-center p-6">
            <h1 class="text-4xl font-bold text-red-500 mb-4">403</h1>
            <h2 class="text-xl font-semibold mb-2">Unauthorized Access</h2>
            <p class="text-gray-600 mb-6">
                You don't have permission to view this page.
            </p>
            <RouterLink to="/" class="btn">
                Go Back to Dashboard
            </RouterLink>
            <!-- link under the button -->
            <p class="text-sm mt-4 text-center">
                or you can
                <button @click="logoutEvent" class="text-blue-600 hover:underline font-medium cursor-pointer">
                    Logout
                </button>
            </p>
        </div>
    </div>
</template>

<script setup>
import Errors from '@/components/Modals/Errors.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const modalRef = ref()
const router = useRouter()
const authStore = useAuthStore()
const logoutEvent = async () => {
    try {
        await authStore.logout()
        router.push('/login')
    } catch (err) {
        modalRef.value.show(err.response?.data?.message || err)
    }
}
</script>