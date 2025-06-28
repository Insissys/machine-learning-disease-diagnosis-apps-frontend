<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <Errors ref="modalRef" />
        <Delete ref="deleteModal" @confirm="confirmDelete" />

        <div class="max-w-7xl mx-auto bg-white rounded shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Patient List</h2>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <input v-model="patientStore.search" type="text" placeholder="Search patients..."
                    class="input input-bordered w-full sm:max-w-xs" />
                <router-link to="/patients/create" class="btn btn-secondary text-base-content">
                    Add New Patient
                </router-link>
            </div>

            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead class="bg-base-200">
                        <tr>
                            <th>Medical Record</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="patient in patientStore.filteredPatients" :key="patient.id">
                            <td>{{ patient.medicalRecord }}</td>
                            <td>{{ patient.name }}</td>
                            <td>{{ patient.gender }}</td>
                            <td>{{ patient.birthDate }}</td>
                            <td>
                                <!-- <router-link :to="`/patients/${patient.id}/edit`" class="btn btn-sm btn-info">
                                    Edit
                                </router-link> -->
                                <button class="btn btn-sm btn-error ml-2" @click="askToDelete(patient.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr v-if="patientStore.filteredPatients.length === 0">
                            <td colspan="5" class="text-center text-gray-500 py-4">No patients found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex justify-center">
                <div class="join">
                    <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">
                        Prev
                    </button>
                    <button class="join-item btn btn-sm no-animation" disabled>
                        Page {{ currentPage }} / {{ totalPages }}
                    </button>
                    <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage++">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePatientStore } from '@/stores'
import Errors from '@/components/Modals/Errors.vue'
import Delete from '@/components/Modals/Delete.vue'

const patientStore = usePatientStore()
const modalRef = ref()
const currentPage = ref(1)
const itemsPerPage = 10
const deleteModal = ref()
const patientIdToDelete = ref(null)

async function loadPatients() {
    if (patientStore.isLoading.value) return

    try {
        await patientStore.fetchAllPatients()
    } catch (err) {
        modalRef.value.show(err)
    }
}

const totalPages = computed(() => {
    const list = Array.isArray(patientStore.patients) ? patientStore.patients : [];
    return Math.ceil(
        list.filter((p) =>
            p.name?.toLowerCase().includes(patientStore.search.toLowerCase())
        ).length / itemsPerPage
    );
});

function askToDelete(id) {
    patientIdToDelete.value = id
    deleteModal.value.show()
}

function confirmDelete() {
    if (patientIdToDelete.value) {
        patientStore.deletePatient(patientIdToDelete.value)
    }
}

onMounted(() => {
    loadPatients()
})
</script>
