<template>
    <div class="dashboard p-6 bg-gray-50 min-h-screen">
        <!-- Dashboard Title -->
        <div class="flex justify-between items-center mb-8">
            <div class="text-sm text-gray-500">
                Last updated: {{ new Date().toLocaleString() }}
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                    <div class="stat-title">Today's Appointments</div>
                    <div class="stat-value text-primary">0</div>
                    <div class="stat-desc">↗︎ 0% from yesterday</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Patients This Month</div>
                    <div class="stat-value text-secondary">0</div>
                    <div class="stat-desc">↗︎ 0% from last month</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Available Staff</div>
                    <div class="stat-value text-accent">0</div>
                    <div class="stat-desc">0 on leave</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-title">AI Diagnoses Today</div>
                    <div class="stat-value text-info">0</div>
                    <div class="stat-desc">↘︎ 0% from yesterday</div>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Upcoming Appointments -->
            <div class="lg:col-span-2">
                <div class="card bg-white shadow">
                    <div class="card-body">
                        <h2 class="card-title text-xl">Upcoming Appointments</h2>
                        <div class="overflow-x-auto">
                            <table class="table w-full">
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Time</th>
                                        <th>Doctor</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(appointment, index) in upcomingAppointments" :key="index">
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12">
                                                        <img :src="appointment.patient.avatar"
                                                            :alt="appointment.patient.name" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">{{ appointment.patient.name }}</div>
                                                    <div class="text-sm opacity-50">{{ appointment.patient.id }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {{ appointment.time }}
                                            <br />
                                            <span class="badge badge-ghost badge-sm">{{ appointment.date }}</span>
                                        </td>
                                        <td>{{ appointment.doctor }}</td>
                                        <td>
                                            <span
                                                :class="`badge ${appointment.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`">
                                                {{ appointment.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">View All Appointments</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions & Notifications -->
            <div class="space-y-6">
                <!-- Quick Actions -->
                <div class="card bg-white shadow">
                    <div class="card-body">
                        <h2 class="card-title text-xl">Quick Actions</h2>
                        <div class="grid md:grid-cols-2 gap-4">
                            <button class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Patient
                            </button>
                            <button class="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Schedule
                            </button>
                            <button class="btn btn-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Reports
                            </button>
                            <button class="btn btn-info">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                AI Diagnosis
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recent Notifications -->
                <div class="card bg-white shadow">
                    <div class="card-body">
                        <h2 class="card-title text-xl">Recent Notifications</h2>
                        <div class="space-y-4">
                            <div v-for="(notification, index) in notifications" :key="index" class="alert"
                                :class="`alert-${notification.type}`">
                                <div>
                                    <svg v-if="notification.type === 'info'" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <svg v-else-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg"
                                        class="stroke-current flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <svg v-else-if="notification.type === 'warning'" xmlns="http://www.w3.org/2000/svg"
                                        class="stroke-current flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg"
                                        class="stroke-current flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ notification.message }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-ghost">View All</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

// export default {
//     name: 'DashboardPage',
//     data() {
//         return {
//             upcomingAppointments: [
//                 {
//                     patient: {
//                         name: 'John Smith',
//                         id: 'PAT-00123',
//                         avatar: 'https://daisyui.com/tailwind-css-component-profile-1@56w.png'
//                     },
//                     time: '10:30 AM',
//                     date: 'Today',
//                     doctor: 'Dr. Sarah Johnson',
//                     status: 'Confirmed'
//                 },
//                 {
//                     patient: {
//                         name: 'Emily Davis',
//                         id: 'PAT-00456',
//                         avatar: 'https://daisyui.com/tailwind-css-component-profile-2@56w.png'
//                     },
//                     time: '2:15 PM',
//                     date: 'Today',
//                     doctor: 'Dr. Michael Chen',
//                     status: 'Confirmed'
//                 },
//                 {
//                     patient: {
//                         name: 'Robert Wilson',
//                         id: 'PAT-00789',
//                         avatar: 'https://daisyui.com/tailwind-css-component-profile-3@56w.png'
//                     },
//                     time: '9:00 AM',
//                     date: 'Tomorrow',
//                     doctor: 'Dr. Lisa Park',
//                     status: 'Pending'
//                 },
//                 {
//                     patient: {
//                         name: 'Maria Garcia',
//                         id: 'PAT-00321',
//                         avatar: 'https://daisyui.com/tailwind-css-component-profile-4@56w.png'
//                     },
//                     time: '11:45 AM',
//                     date: 'Tomorrow',
//                     doctor: 'Dr. David Kim',
//                     status: 'Confirmed'
//                 }
//             ],
//             notifications: [
//                 {
//                     type: 'info',
//                     message: 'New AI diagnosis model update available'
//                 },
//                 {
//                     type: 'success',
//                     message: 'Patient check-in completed successfully'
//                 },
//                 {
//                     type: 'warning',
//                     message: '3 appointments pending confirmation'
//                 },
//                 {
//                     type: 'error',
//                     message: 'System maintenance scheduled for tonight'
//                 }
//             ]
//         }
//     }
// }
</script>
