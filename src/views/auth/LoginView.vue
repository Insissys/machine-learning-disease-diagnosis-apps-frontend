<template>
  <div v-if="errorMsg" class="alert alert-error mb-4">
    {{ errorMsg }}
  </div>
  <div class="bg-white shadow-lg rounded-2xl border border-gray-100 p-10 w-full max-w-sm animate-fade-in">
    <form @submit.prevent="login" class="p-8">
      <div class="text-center mb-6">
        <!-- <img src="/logo.png" class="w-14 mx-auto mb-2" /> -->
        <h1 class="font-bold text-lg">Insissys</h1>
        <p class="text-xs text-gray-500">Disease Diagnosis System</p>
      </div>
      <h2 class="text-2xl font-semibold text-center">
        Welcome back
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Please sign in to continue
      </p>
  
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Email</label>
        <input 
          v-model="email" 
          type="email" 
          class="input input-bordered w-full focus:input-primary" 
          :disabled="isLoading" 
          required 
        />
      </div>
  
      <div class="mb-6">
        <label class="block mb-1 text-sm font-medium">Password</label>
        <input 
          v-model="password" 
          type="password" 
          class="input input-bordered w-full focus:input-primary" 
          :disabled="isLoading" 
          required 
        />
      </div>
  
      <button class="btn btn-primary w-full text-white shadow-md hover:shadow-lg transition-all" :disabled="isLoading">
        <span v-if="!isLoading">Login</span>
        <span v-else class="loading loading-spinner loading-sm"></span>
      </button>
  
      <div class="divider text-xs my-6">or</div>
  
      <p class="text-sm mt-4 text-center">
        Don't have an account?
        <router-link to="/register" class="text-blue-600">
          Sign up instead
        </router-link>
      </p>
      <p class="text-xs text-center text-gray-400 mt-6">
        © 2026 Pangkreas
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/user";

const router = useRouter();
const authStore = useAuthStore();
const userStore = useProfileStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMsg = ref("");

const login = async () => {
  if (isLoading.value) return;
  errorMsg.value = "";
  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);
    await userStore.fetchProfile();
    router.push("/dashboard");
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Login failed";
    isLoading.value = false;
  }
};
</script>
