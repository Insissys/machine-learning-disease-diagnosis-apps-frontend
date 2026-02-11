<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

import MainLayout from "@/layputs/MainLayout.vue";
import AuthLayout from "@/layputs/AuthLayout.vue";
import EmptyLayout from "@/layputs/EmptyLayout.vue";

const route = useRoute();

const layouts = {
  main: MainLayout,
  auth: AuthLayout,
  none: EmptyLayout,
};

const layoutComponent = computed(() => {
  const layout = route.meta.layout || "main";
  return layouts[layout];
});
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
