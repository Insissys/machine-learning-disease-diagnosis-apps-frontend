<template>
    <dialog ref="dialogRef" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg text-red-500">Error</h3>
            <p class="py-4">{{ message }}</p>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-error">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const dialogRef = ref(null)
const message = ref('')

function show(msg) {
    message.value = msg
    dialogRef.value?.showModal()
}

// function close() {
//     visible.value = false
// }

defineExpose({ show }) // expose for parent to call
</script>