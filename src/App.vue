<script setup>
import { RouterView, useRoute } from "vue-router";
import LayoutWrapper from "@/components/LayoutWrapper.vue";

const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout === 'none' ? 'div' : LayoutWrapper">
    <RouterView />
  </component>
</template>
