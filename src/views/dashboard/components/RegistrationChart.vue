<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "@/stores/dashboard";

const dashboardStore = useDashboardStore();
const { registrationsChart } = storeToRefs(dashboardStore);

const series = ref([
  {
    name: "Registrations",
    data: registrationsChart,
  },
]);

const chartOptions = ref({
  chart: {
    type: "area",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
    },
  },
});
</script>

<template>
  <div class="card bg-white shadow-sm border border-base-300/60">
    <div class="card-body">
      <h2 class="card-title text-lg">Registrations This Week</h2>
      <p class="text-xs opacity-60 -mt-2">
        Number of new registrations per day
      </p>
      <p v-if="dashboardStore.registrationsChart.every(v => v === 0)"
        class="text-center text-sm opacity-60 mt-10">
        No registrations this week
      </p>
      <div v-else class="mt-4">
        <apexchart
          height="260"
          type="area"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </div>
</template>
