<template>
    <div class="drawer h-screen">
        <input id="main-drawer" type="checkbox" class="drawer-toggle" />

        <!-- Top Layout (Navbar + Content + Footer) -->
        <div class="drawer-content flex flex-col h-full">
            <!-- Sticky Navbar -->
            <header class="navbar bg-base-200 sticky top-0 z-50 shadow-sm h-16">
                <div class="flex-none">
                    <label for="main-drawer" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                </div>
                <div class="flex-1 px-2">
                    <span class="text-lg font-bold">{{}}</span>
                </div>
                <div class="flex-none gap-2">
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-square btn-ghost">
                            <font-awesome-icon :icon="['fas', 'ellipsis']" />
                        </label>
                        <ul tabindex="0"
                            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><router-link to="/profile">Profile</router-link></li>
                            <li><router-link to="/settings">Settings</router-link></li>
                            <li><button @click="logout">Logout</button></li>
                        </ul>
                    </div>
                </div>
            </header>

            <!-- Main Content Area -->
            <main class="flex-1 overflow-y-auto bg-base-100">
                <slot />
            </main>

            <!-- Compact Footer -->
            <footer class="bg-base-200 border-t border-base-300 h-12 flex items-center px-4">
                <div class="flex-1 text-sm text-base-content/70">
                    © 2025 Duck Developer
                </div>
                <div class="flex-none flex gap-4">
                    <router-link to="/help" class="btn btn-ghost btn-xs">Help</router-link>
                    <!-- <router-link to="/privacy" class="btn btn-ghost btn-xs">Privacy</router-link>
                    <router-link to="/terms" class="btn btn-ghost btn-xs">Terms</router-link> -->
                </div>
            </footer>
        </div>

        <!-- Drawer Sidebar -->
        <div class="drawer-side">
            <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <aside class="bg-base-200 w-64 min-h-full flex flex-col">

                <!-- Menu Content -->
                <div class="flex-1 overflow-y-auto p-2 mt-16">
                    <ul class="menu">
                        <li v-for="menu in filteredMenus" :key="menu.path">
                            <router-link :to="menu.path" class="active:bg-primary active:text-primary-content"
                                @click="autoCloseDrawer">
                                {{ menu.meta?.nameInDrawer }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Sidebar Footer -->
                <div class="p-2 border-t border-base-300">
                    <div class="flex justify-between items-center text-sm px-2">
                        <span>System Status</span>
                        <span class="badge badge-success badge-xs">Online</span>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/user';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useProfileStore();

// Filtered menus
const filteredMenus = computed(() =>
    router.getRoutes()
        .filter(route =>
            route.meta?.showInDrawer &&
            route.meta?.allowedRoles?.includes(userStore.user?.role.name)
        )
);

// Auto-close drawer on mobile
const autoCloseDrawer = () => {
    document.getElementById('main-drawer').checked = false;
};

const logout = async () => {
    try {
        await authStore.logout();
        router.push('/login');
    } catch (err) {
        // console.error('Logout failed:', err);
    }
};
</script>
