<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    <StatCard 
      class="transition hover:shadow-md hover:-translate-y-0.5" 
      title="Today's Queue" 
      :value="stats.todayQueue" 
      color="bg-primary"
    >
      <template #icon>
        <font-awesome-icon icon="clock" />
      </template>
    </StatCard>
    <StatCard 
      class="transition hover:shadow-md hover:-translate-y-0.5" 
      title="Total Patients" 
      :value="stats.totalPatients" 
      color="bg-success"
    >
      <template #icon>
        <font-awesome-icon icon="users" />
      </template>
    </StatCard>
    <StatCard 
      class="transition hover:shadow-md hover:-translate-y-0.5" 
      title="Staff" 
      :value="stats.totalStaff" 
      color="bg-info"
    >
      <template #icon>
        <font-awesome-icon icon="user-doctor" />
      </template>
    </StatCard>
    <StatCard 
      class="transition hover:shadow-md hover:-translate-y-0.5" 
      title="Registrations Today" 
      :value="stats.registrationsToday" 
      color="bg-warning"
    >
      <template #icon>
        <font-awesome-icon icon="chart-line" />
      </template>
    </StatCard>
  </div>
</template>

<script setup>
import StatCard from "./StatCard.vue";

defineProps({
  stats: Object
});
</script>
