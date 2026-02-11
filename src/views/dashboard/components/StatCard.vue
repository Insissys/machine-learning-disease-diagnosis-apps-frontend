<template>
  <div class="card bg-base-100 shadow rounded-2xl hover:shadow-md transition">
    <div class="card-body flex flex-row items-center gap-4">

      <!-- ICON SLOT -->
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl"
        :class="color"
      >
        <slot name="icon" />
      </div>

      <!-- TEXT -->
      <div>
        <p class="text-sm opacity-60">{{ title }}</p>
        <p class="text-2xl font-bold mt-1">{{ value }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  color: String
})
</script>