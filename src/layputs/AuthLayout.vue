<template>
  <div class="h-screen flex">
    <!-- LEFT : FORM AREA -->
    <div class="flex items-center justify-center w-full md:w-1/2 bg-white">
      <slot />
    </div>

    <!-- RIGHT : IMAGE AREA -->
    <div class="hidden md:flex items-center justify-center w-1/2 bg-gradient-to-br from-slate-100 to-slate-200 p-10 relative">
      <img :src="image" class="max-w-2xl w-full" />

      <a
        v-if="credit"
        :href="credit.link"
        target="_blank"
        class="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded"
      >
        {{ credit.text }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const image = computed(() => route.meta.image);
const credit = computed(() => route.meta.credit);
</script>
