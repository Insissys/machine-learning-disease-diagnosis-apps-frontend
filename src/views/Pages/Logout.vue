<!-- views/Logout.vue -->
<script setup>
import { useAuthStore } from "@/stores"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

auth.logout()
router.push("/login")
</script>

<template>
</template>
