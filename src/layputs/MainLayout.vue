<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const userStore = useProfileStore();

const pageTitle = computed(() => route.meta?.title || "Dashboard");

// menu generator dari router meta 🔥
const menus = computed(() =>
  router.getRoutes().filter(
    (r) =>
      r.meta?.showInDrawer &&
      r.meta?.allowedRoles?.includes(userStore.user?.role?.name)
  )
);

const autoCloseDrawer = () => {
  const drawer = document.getElementById("main-drawer");
  if (drawer) drawer.checked = false;
};

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="drawer h-screen">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col h-full">
      <!-- Navbar -->
      <header class="navbar bg-base-200 sticky top-0 z-50 shadow-sm h-16">
        <div class="flex-none">
          <label for="main-drawer" class="btn btn-square btn-ghost">☰</label>
        </div>

        <div class="flex-1 px-2 font-bold text-lg">
          {{ pageTitle }}
        </div>

        <div class="flex-none">
          <button class="btn btn-ghost btn-sm" @click="logout">Logout</button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto bg-base-100">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="bg-base-200 border-t h-12 flex items-center px-4">
        © 2025 Duck Developer
      </footer>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="main-drawer" class="drawer-overlay"></label>

      <aside class="bg-base-200 w-64 min-h-full p-2">
        <ul class="menu">
          <li v-for="menu in menus" :key="menu.path">
            <router-link :to="menu.path" @click="autoCloseDrawer">
              {{ menu.meta.nameInDrawer }}
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
