<template>
    <div v-if="!isEmptyPatient">
        <!-- Floating input box at the bottom -->
        <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
            <div class="bg-base-300 p-4 shadow-xl rounded-lg">

                <!-- Textarea for user input -->
                <textarea ref="textareaChat" v-model="message" rows="1" placeholder="Paparkan gejalamu"
                    class="w-full resize-none focus:outline-none focus:ring-0 focus:border-transparent p-2 rounded-md text-base-content"
                    @input="autoResize" :disabled="isListening">
                </textarea>

                <!-- Button row below input -->
                <div class="flex justify-between items-center mt-2">
                    <!-- Microphone button -->
                    <div class="tooltip" data-tip="Dikte">
                        <button @click="handleListening"
                            class="btn btn-sm btn-outline btn-primary rounded-full h-10 w-10">
                            <div v-if="!isListening">
                                <font-awesome-icon :icon="['fas', 'microphone']" />
                            </div>
                            <div v-else>
                                <span class="loading loading-dots loading-md"></span>
                            </div>
                        </button>
                    </div>

                    <!-- Send button -->
                    <button class="btn btn-sm btn-outline btn-dark">
                        Kirim
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { shallowRef, ref, nextTick, watch } from 'vue'
import { useSpeechRecognition } from '@vueuse/core'

const props = defineProps({
    isEmptyPatient: Boolean,
})

const lang = shallowRef('id-ID')
const speech = useSpeechRecognition({
    lang,
    continuous: true,
    interimResults: false,
})
const { isListening } = speech

function startSpeechToText() {
    speech.result.value = ''
    speech.start()
}

function stopSpeechToText() {
    speech.stop()
}

function handleListening() {
    if (!isListening.value) {
        startSpeechToText()
    } else {
        stopSpeechToText()
    }
}

const message = ref("")
let lastResult = ""
watch(speech.result, (val) => {
    if (val !== lastResult) {
        message.value += ', ' + val.replace(lastResult, "")
        lastResult = val
    }
})


const textareaChat = ref(null)
const autoResize = () => {
    nextTick(() => {
        if (textareaChat.value) {
            textareaChat.value.style.height = 'auto' // Reset height
            textareaChat.value.style.height = textareaChat.value.scrollHeight + 'px' // Set new height
        }
    })
}
watch(message, () => {
    autoResize();
})

</script>