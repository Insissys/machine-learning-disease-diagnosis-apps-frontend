<template>
  <div class="card bg-base-100 shadow rounded-2xl">
    <div class="card-body">
      <h2 class="card-title">Quick Actions</h2>

      <div class="grid gap-3 mt-4">

        <!-- New Patient -->
        <router-link
          to="/patients"
          class="
            group flex items-center gap-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition
            hover:scale-[1.02] hover:shadow-md
          "
        >
          <div class="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-lg shadow-sm">
            +
          </div>

          <div class="flex flex-col">
            <span class="font-semibold text-base">New Patient</span>
            <span class="text-xs opacity-60">Add new patient data</span>
          </div>
        </router-link>

        <!-- Registration -->
        <router-link
          to="/registrations"
          class="
            group flex items-center gap-4 p-4 rounded-xl bg-accent/10 hover:bg-accent/20 transition
            hover:scale-[1.02] hover:shadow-md
          "
        >
          <div class="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center text-lg shadow-sm">
            📋
          </div>

          <div class="flex flex-col">
            <span class="font-semibold text-base">Registration</span>
            <span class="text-xs opacity-60">Create new registration</span>
          </div>
        </router-link>

      </div>
    </div>
  </div>
</template>
