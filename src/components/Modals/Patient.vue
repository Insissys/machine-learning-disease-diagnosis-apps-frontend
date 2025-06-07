<template>
    <dialog ref="modalPatient" id="my_modal_4" class="modal">
        <div class="modal-box overflow-visible w-11/12 max-w-5xl">
            <h3 class="text-lg font-bold">Form Pasien</h3>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Medical Record</legend>
                    <input v-model="patient.medicalRecord" type="text" class="input w-full"
                        placeholder="Medical Record" />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Nama Pasien</legend>
                    <input v-model="patient.name" type="text" class="input w-full" placeholder="Nama Pasien" />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Tanggal Lahir</legend>

                    <vue-date-picker v-model="patient.birthDate" :month-change-on-scroll="false" model-type="dd-MM-yyyy"
                        :always-clearable="true" auto-apply placeholder="Tanggal Lahir" autocomplete="off"
                        :teleport="false" format="dd-MM-yyy" :hide-input-icon="true"
                        :ui="{ input: '!input !w-full !text-base-content', menu: '!absolute' }" />

                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Jenis Kelamin</legend>
                    <select v-model="patient.gender" class="select w-full">
                        <option value="" disabled selected>Jenis Kelamin</option>
                        <option>Laki - laki</option>
                        <option>Perempuan</option>
                    </select>
                </fieldset>
            </div>

            <div class="modal-action">
                <button class="btn" @click="closeModal">Close</button>
                <button class="btn btn-outline btn-primary" @click="submitPatient">Simpan</button>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { usePatientStore } from '@/stores';
import { ref } from 'vue';

const modalPatient = ref(null);

function showModal() {
    modalPatient.value?.showModal()
}

function closeModal() {
    modalPatient.value?.close()
}

defineExpose({
    showModal,
    closeModal,
})

const patient = ref({
    medicalRecord: "",
    name: "",
    birthDate: "",
    gender: "",
})

function submitPatient() {
    /*
        Should do send to backend first
    */
    let p = usePatientStore()
    p.setPatient(patient)

    closeModal()
}

</script>