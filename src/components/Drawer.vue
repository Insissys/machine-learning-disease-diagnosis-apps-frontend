<template>
    <Patient ref="modalPatient" />
    <div class="drawer">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-300 text-base-content min-h-full w-80 p-4">

                <label class="input">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    <input type="search" class="grow" placeholder="Cari Pasien" />
                </label>

                <div class="divider"></div>

                <div class="grid gap-y-3">
                    <button class="btn btn-md btn-outline btn-secondary" @click="handleAddButton">
                        Pasien Baru
                    </button>

                    <div v-for="(p, index) in patients" :key="index">
                        <div class="card card-sm bg-base-100 shadow-sm cursor-pointer">
                            <div class="card-body">
                                <h2 class="card-title">{{ p.name }}</h2>
                                <div class="card-content">{{ p.birthDate }}</div>
                                <div class="card-actions justify-end items-center">
                                    <div class="status"
                                        :class="{ 'status-error': !p.isChecked, 'status-success': p.isChecked }"></div>
                                    {{ !p.isChecked ? 'Belum di diagnosa' : 'Sudah di diagnosa' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ul>
        </div>
    </div>
</template>

<script setup>
import { usePatientsStore } from '@/stores';
import Patient from '@/components/Modals/Patient.vue';
import { ref } from 'vue';

const { patients } = usePatientsStore()
const modalPatient = ref(null)

const handleAddButton = () => {
    document.getElementById('my-drawer-2').click();
    modalPatient.value?.showModal()
}

</script>