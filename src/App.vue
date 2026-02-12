<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

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
    <RouterView v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </component>
</template>

<style>
@keyframes progress {
  0% { width: 0%; opacity: 1; }
  50% { width: 60%; }
  100% { width: 100%; opacity: 0; }
}

.animate-progress {
  animation: progress 0.8s ease-out forwards;
}

.page-enter-active,
.page-leave-active {
  transition: all .15s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
