<template>
  <div class="card bg-base-100 shadow rounded-2xl">
    <div class="card-body">

      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg font-bold">Queuing Today</h2>
          <p class="text-xs opacity-60">
            Patients waiting for consultation
          </p>
        </div>
        <router-link to="/queuing" class="btn btn-sm btn-outline">
          View all
        </router-link>
      </div>

      <div class="overflow-x-auto mt-3">
        <table class="table">
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Time</th>
              <th>Medical Record</th>
              <th>Patient</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="q in dashboardStore.todayQueueList" :key="q.id" class="hover:bg-base-200/40 transition-colors duration-200">
              <td>{{ q.registration_number }}</td>
              <td>{{ formatDate(q.created_at) }}</td>
              <td>{{ q.medical_record?.medical_record_number }}</td>
              <td>{{ q.medical_record?.patient?.name }}</td>
            </tr>

            <tr v-if="dashboardStore.todayQueueList.length === 0">
              <td colspan="4" class="text-center py-10 opacity-60">
                No queue today
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";

const dashboardStore = useDashboardStore();
onMounted(() => {
  dashboardStore.fetchDashboard();
});

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>
