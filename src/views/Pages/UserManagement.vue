<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">User Management</h2>
            <input v-model="search" type="text" placeholder="Search users..."
                class="mb-4 px-4 py-2 border rounded w-full" />
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <button class="btn btn-sm btn-info">Edit</button>
                            <button class="btn btn-sm btn-error ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const users = ref([
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'doctor' },
])
const filteredUsers = computed(() => {
    return users.value.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>
