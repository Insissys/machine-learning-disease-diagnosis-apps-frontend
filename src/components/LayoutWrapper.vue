<template>
    <div class="drawer drawer-mobile h-screen overflow-hidden">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Main Content -->
            <div class="flex-1">
                <!-- Navbar -->
                <div class="navbar shadow-sm bg-base-300">
                    <div class="navbar-start">
                        <label for="my-drawer-2" class="btn btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                    </div>
                    <div class="navbar-end">
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-square btn-ghost">
                                <font-awesome-icon :icon="['fas', 'ellipsis']" />
                            </label>
                            <ul tabindex="0" class="menu dropdown-content bg-base-200 z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>Profile</a></li>
                                <li><button @click="logout">Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <main class="flex-1 overflow-y-auto bg-gray-100">
                    <slot />
                </main>
            </div>
        </div>

        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-300 text-base-content min-h-full w-80 p-4">
                <div class="mb-4">
                    <label class="text-xs font-bold uppercase opacity-60 mb-2 block">Menu</label>
                    <div v-if="userRole === 'doctor'">
                        <li><router-link to="/doctor-patients" class="font-semibold" @click="handleAddButton">Waiting List</router-link></li>
                    </div>
                    <div v-else>
                        <li><router-link to="/" class="font-semibold" @click="handleAddButton">Dashboard</router-link></li>
                        <li><router-link to="/patients" class="font-semibold" @click="handleAddButton">Patients</router-link></li>
                        <li><router-link to="/users" class="font-semibold" @click="handleAddButton">User Management</router-link></li>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
// Layout wrapper component
import { ref, onMounted } from 'vue'

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    router.push('/login')
}

const handleAddButton = () => {
    document.getElementById('my-drawer-2').click();
    modalPatient.value?.showModal()
}

</script>