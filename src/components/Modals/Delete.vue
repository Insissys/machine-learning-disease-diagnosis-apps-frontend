<template>
    <dialog ref="modalRef" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Confirm Deletion</h3>
            <p class="py-4">{{ message }}</p>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-error">Close</button>
                </form>
                <button class="btn btn-error" @click="confirmDelete">Delete</button>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { ref } from 'vue'

const modalRef = ref(null)
const message = ref('')
const emit = defineEmits(['confirm'])

function show(msg) {
    message.value = msg
    modalRef.value?.showModal()
}

function confirmDelete() {
    emit('confirm')
    modalRef.value?.close()
}

defineExpose({ show })
</script>
