<template>
  <div class="p-8 bg-gray-100 space-y-6">

    <!-- LAST UPDATE -->
    <div class="text-sm opacity-60">
      Last updated: {{ lastUpdated }}
    </div>

    <div class="mb-10">
      <h1 class="text-2xl font-bold">
        Welcome back, {{ userStore.user?.name.split(' ')[0] }} 👋
      </h1>
      <p class="text-sm opacity-60">
        Here’s what’s happening in your clinic today
      </p>
    </div>

    <!-- STATS -->
    <StatsCards :stats="dashboardStore.stats" />

    <!-- CONTENT -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <QueueToday
        class="xl:col-span-2"
        :queues="dashboardStore.todayQueueList"
      />

      <div class="space-y-6">
        <RegistrationChart :data="dashboardStore.weeklyRegistrations"/>
        <QuickActions />
      </div>

    </div>

  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import { useProfileStore } from "@/stores/user";

import StatsCards from "./components/StatsCards.vue";
import QueueToday from "./components/QueueToday.vue";
import QuickActions from "./components/QuickActions.vue";
import RegistrationChart from "./components/RegistrationChart.vue";

const dashboardStore = useDashboardStore();
const userStore = useProfileStore();

const lastUpdated = computed(() =>
  new Date().toLocaleString()
);

onMounted(() => {
  dashboardStore.fetchDashboard();
});
</script>
