<script setup>
import { ref } from "vue";
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

const isCollapsed = ref(false);
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

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
  <div class="drawer lg:drawer-open">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />

    <!-- ================= CONTENT ================= -->
    <div class="drawer-content flex flex-col min-h-screen">

      <!-- NAVBAR -->
      <header class="navbar bg-base-100 border-b shadow-sm sticky top-0 z-50 px-4 border-base-300/60">
        <button class="btn btn-ghost btn-square" @click="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <div class="flex-1 font-bold text-lg">
          {{ pageTitle }}
        </div>

        <!-- USER -->
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-semibold">
              {{ userStore.user?.name }}
            </div>
            <div class="text-xs opacity-60">
              {{ userStore.user?.role?.name }}
            </div>
          </div>

          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full bg-primary text-white flex items-center justify-center ring ring-primary/30 ring-offset-2">
                {{ userStore.user?.name?.charAt(0) }}
              </div>
            </label>

            <ul tabindex="0" class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a @click="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </header>

      <!-- PAGE CONTENT -->
      <main class="flex-1 p-6 bg-base-200/40">
        <slot />
      </main>

      <!-- FOOTER -->
      <footer class="footer footer-center p-3 bg-base-100 border-t text-xs border-base-300/60">
        © 2025 Insissys — Disease Diagnosis System
      </footer>
    </div>

    <!-- ================= SIDEBAR ================= -->
    <div class="drawer-side">
      <label for="main-drawer" class="drawer-overlay"></label>

      <aside :class="[
            'flex flex-col h-full bg-base-200 border-r transition-all duration-300 border-base-300/60',
            isCollapsed ? 'w-20' : 'w-64'
        ]">

        <!-- BRAND -->
        <div class="p-4 border-b flex items-center gap-3 border-base-300/60">
            <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                I
            </div>

            <div v-if="!isCollapsed">
                <div class="font-bold text-primary">Insissys</div>
                <div class="text-xs opacity-60">Disease Diagnosis</div>
            </div>
        </div>

        <!-- MENU -->
        <div class="flex-1 overflow-y-auto p-2">
            <ul class="menu">
                <li v-for="menu in menus" :key="menu.path">
                    <router-link
                        :to="menu.path"
                        class="flex items-center gap-3 rounded-lg px-3 py-2"
                        :class="route.path === menu.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-base-300'"
                    >
                        <font-awesome-icon
                            :icon="['fas', menu.meta.icon || 'circle']"
                            class="w-5"
                        />

                        <span v-if="!isCollapsed">
                        {{ menu.meta.nameInDrawer }}
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="mt-auto p-3 border-t border-base-300/60">
            <div class="flex items-center justify-between text-sm">
                <span v-if="!isCollapsed">System Status</span>
                <span class="badge badge-success badge-sm">Online</span>
            </div>
        </div>

      </aside>
    </div>
  </div>
</template>

