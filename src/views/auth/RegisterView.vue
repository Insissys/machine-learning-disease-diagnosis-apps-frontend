<template>
  <div class="bg-white shadow-lg rounded-2xl border border-gray-100 p-10 w-full max-w-sm animate-fade-in">
    <form @submit.prevent="register">

      <!-- header -->
      <h2 class="text-2xl font-semibold text-center">
        Create your account
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Start managing patients today
      </p>

      <!-- error -->
      <div v-if="errorMsg" class="alert alert-error mb-4">
        {{ errorMsg }}
      </div>

      <!-- office -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Office Name</label>
        <input v-model="officename" class="input input-bordered w-full focus:input-primary"
          :disabled="isLoading" required />
      </div>

      <!-- address -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Address</label>
        <textarea v-model="address"
          class="textarea textarea-bordered w-full focus:textarea-primary resize-none"
          :disabled="isLoading" required />
      </div>

      <!-- name -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Name</label>
        <input v-model="name" class="input input-bordered w-full focus:input-primary"
          :disabled="isLoading" required />
      </div>

      <!-- email -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Email</label>
        <input v-model="email" type="email"
          class="input input-bordered w-full focus:input-primary"
          :disabled="isLoading" required />
      </div>

      <!-- password -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">Password</label>

        <div class="relative">
          <input v-model="password"
            :type="password"
            class="input input-bordered w-full pr-10 focus:input-primary"
            :disabled="isLoading" required />
        </div>
      </div>

      <!-- confirm password -->
      <div class="mb-6">
        <label class="block mb-1 text-sm font-medium">Confirm Password</label>

        <div class="relative">
          <input v-model="confirmPassword"
            :type="password"
            class="input input-bordered w-full pr-10 focus:input-primary"
            :disabled="isLoading" required />
        </div>
      </div>

      <!-- button -->
      <button
        class="btn btn-primary w-full text-white shadow-md hover:shadow-lg transition-all"
        :disabled="isLoading">

        <span v-if="!isLoading">Register</span>
        <span v-else class="loading loading-spinner loading-sm"></span>
      </button>

      <div class="divider text-xs my-6">or</div>

      <p class="text-sm text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-600">
          Sign in instead
        </router-link>
      </p>

      <p class="text-xs text-center text-gray-400 mt-6">
        © 2026 Duck Developers
      </p>

    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const officename = ref("");
const address = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const errorMsg = ref("");

const register = async () => {
  if (isLoading.value) return;

  errorMsg.value = "";

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Password does not match";
    return;
  }

  isLoading.value = true;

  try {
    await authStore.register({
      officename: officename.value,
      address: address.value,
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("/login");
  } catch (err) {
    errorMsg.value =
      err.response?.data?.message || "Registration failed";

    isLoading.value = false;
  }
};
</script>
