<template>
    <Errors ref="modalRef" />
    <Info ref="modalInfo" />
    <Delete ref="deleteModal" @confirm="confirmDelete" />

    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">User Management</h2>
                    <p class="text-sm text-gray-500 mt-1">Total users: {{ userStore.users?.length }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input v-model="searchQuery" type="text" placeholder="Search"
                            class="input input-bordered w-full" />
                    </div>
                    <router-link to="/users/create" class="btn btn-primary gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New User
                    </router-link>
                </div>
            </div>

            <div class="overflow-x-auto border rounded-lg">
                <table class="table w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="w-2/6">User</th>
                            <th class="w-2/6">Email</th>
                            <th class="w-1/6">Role</th>
                            <th class="w-1/6">Account Status</th>
                            <th class="w-1/6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
                            <td>
                                <div class="flex items-center gap-3">
                                    <div>
                                        <div class="font-medium">{{ user.name }}</div>
                                        <div class="text-sm text-gray-500">Expired date: {{ formatDate(user.expired)
                                            }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="font-medium">{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>
                                <span class="badge text-white"
                                    :class="{ 'badge-primary': user.isactive, 'badge-secondary': !user.isactive }">
                                    {{ user.isactive ? 'active' : 'inactive' }}
                                </span>
                            </td>
                            <td class="text-right">
                                <div class="flex justify-end gap-2">
                                    <!-- Activate/Active -->
                                    <button class="btn btn-ghost btn-sm btn-square tooltip"
                                        @click="() => user.isactive ? deactivateUser(user.id) : activateUser(user.id)"
                                        :data-tip="user.isactive ? 'Deactivate' : 'Activate'">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path v-if="!user.isactive" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M5 13l4 4L19 7" />
                                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <!-- Edit -->
                                    <router-link :to="`/users/${user.id}/edit`"
                                        class="btn btn-ghost btn-sm btn-square text-info tooltip" data-tip="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5 m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828 l8.586-8.586z" />
                                        </svg>
                                    </router-link>

                                    <!-- Delete -->
                                    <button class="btn btn-ghost btn-sm btn-square text-error tooltip"
                                        @click="askToDelete(user.id)" data-tip="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7 m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredUsers.length === 0">
                            <td colspan="4" class="text-center py-8">
                                <div class="flex flex-col items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class="text-gray-500">No users found</p>
                                    <router-link to="/users/create" class="btn btn-sm btn-primary mt-2 text-white">
                                        Add New User
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing {{ startItem }}-{{ endItem }} of {{ filteredUsers.length }} users
                </div>
                <div class="join">
                    <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === 1 }"
                        @click="currentPage--">
                        Previous
                    </button>
                    <button v-for="page in visiblePages" :key="page" class="join-item btn btn-sm"
                        :class="{ 'btn-active': page === currentPage }" @click="currentPage = page">
                        {{ page }}
                    </button>
                    <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === totalPages }"
                        @click="currentPage++">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Errors from '@/components/Modals/Errors.vue'
import Delete from '@/components/Modals/Delete.vue'
import Info from '@/components/Modals/Info.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const modalRef = ref()
const deleteModal = ref()
const modalInfo = ref()
const userIdToDelete = ref(null)


// Computed properties
const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return userStore.users?.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    )
})

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, filteredUsers.value.length)
})

const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

// Methods
function formatDate(dateString) {
    if (!dateString) return 'Never'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

function askToDelete(id) {
    userIdToDelete.value = id
    deleteModal.value.show(`Are you sure you want to delete this user?`)
}

function confirmDelete() {
    if (userIdToDelete.value) {
        userStore.deleteUser(userIdToDelete.value)
            .then(() => {
                modalInfo.value.show('User deleted successfully')
                loadUsers()
            })
            .catch(error => {
                modalRef.value.show(error.message || 'Failed to delete user')
            })
    }
}

async function activateUser(id) {
    userStore.activateUser(id)
        .then(() => {
            modalInfo.value.show('User activated successfully')
            loadUsers()
        })
        .catch(error => {
            modalRef.value.show(error.message || 'Failed to activate user')
        })
}

async function deactivateUser(id) {
    userStore.deactivateUser(id)
        .then(() => {
            modalInfo.value.show('User deactivated successfully')
            loadUsers()
        })
        .catch(error => {
            modalRef.value.show(error.message || 'Failed to activate user')
        })
}

async function loadUsers() {
    try {
        await userStore.fetchAllUsers()
    } catch (error) {
        modalRef.value.show(error)
    }
}

onMounted(() => {
    loadUsers()
})
</script>