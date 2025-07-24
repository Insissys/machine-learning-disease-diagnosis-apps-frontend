<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Header -->
            <div class="bg-primary text-white p-4">
                <h2 class="text-2xl font-bold">Profile</h2>
                <p class="text-sm opacity-90">Manage your account and office information</p>
            </div>

            <!-- Main Content -->
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Office Information Section -->
                <div class="border rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">Office Information</h3>
                        <!-- <button @click="editOfficeInfo" class="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button> -->
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Office Name</label>
                            <p class="mt-1">{{ office.name }}</p>
                        </div>

                        <div>
                            <label class="text-sm font-medium text-gray-500">Address</label>
                            <p class="mt-1 whitespace-pre-line">{{ office.address }}</p>
                        </div>
                    </div>
                </div>

                <!-- User Profile Section -->
                <div class="border rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">Your Profile</h3>
                        <!-- <button @click="editUserProfile" class="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button> -->
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                            <div>
                                <h4 class="font-medium text-lg">{{ user.name }}</h4>
                                <p class="text-gray-500">{{ user.role }}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-medium text-gray-500">Email</label>
                                <p class="mt-1">{{ user.email }}</p>
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-500">Expired Date</label>
                                <p class="mt-1">{{ formatDateTime(user.lastLogin) }}</p>
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-500">Account Created</label>
                                <p class="mt-1">{{ formatDateTime(user.createdAt) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Security Section -->
                <!-- <div class="border rounded-lg p-6 md:col-span-2">
                    <h3 class="text-lg font-semibold mb-4">Security</h3>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <h4 class="font-medium">Password</h4>
                                <p class="text-sm text-gray-500">Last changed {{ formatDate(user.passwordLastChanged) }}
                                </p>
                            </div>
                            <button @click="changePassword" class="btn btn-sm btn-outline">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div> -->
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data - replace with actual user data from your auth system
const user = ref({
    name: 'Sarah Johnson',
    email: 's.johnson@medicalclinic.com',
    role: 'Doctor',
    phone: '(555) 123-4567',
    lastLogin: '2023-07-20T14:30:00Z',
    createdAt: '2021-03-15',
    passwordLastChanged: '2023-05-10',
    twoFactorEnabled: true
})

const office = ref({
    name: 'City Medical Center',
    address: '123 Healthcare Blvd\nSuite 200\nSpringfield, ST 12345',
    phone: '(555) 987-6543',
    hours: 'Monday-Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed'
})

// Computed properties
const userInitials = computed(() => {
    return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

// Modal controls
const showOfficeModal = ref(false)
const showProfileModal = ref(false)

// Form data
const editOfficeForm = ref({ ...office.value })
const editProfileForm = ref({ ...user.value })

// Methods
const editOfficeInfo = () => {
    editOfficeForm.value = { ...office.value }
    showOfficeModal.value = true
}

const saveOfficeInfo = () => {
    office.value = { ...editOfficeForm.value }
    showOfficeModal.value = false
    // In a real app, you would make an API call here to save the office info
}

const editUserProfile = () => {
    editProfileForm.value = { ...user.value }
    showProfileModal.value = true
}

const saveProfile = () => {
    user.value = { ...editProfileForm.value }
    showProfileModal.value = false
    // In a real app, you would make an API call here to save the profile
}

const changePassword = () => {
    alert('Password change functionality would open here')
    // In a real app, this would open a password change dialog
}

const toggleTwoFactor = () => {
    user.value.twoFactorEnabled = !user.value.twoFactorEnabled
    alert(`Two-factor authentication ${user.value.twoFactorEnabled ? 'enabled' : 'disabled'}`)
    // In a real app, you would make an API call here to update 2FA status
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ''
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(dateTimeString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>