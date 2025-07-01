<!-- <template>
    <div class="flex flex-col h-screen">
        <Navbar />
        <Drawer />
        <div class="max-w-3xl lg:max-w-4xl mx-auto overflow-hidden">
            <Welcome :is-empty-patient="isEmptyPatient(patient.patient)"
                v-if="chat.messages.length == 0 || chat.messages.length === undefined" />
            <Chat v-else />

        </div>
        <InputBox :is-empty-patient="isEmptyPatient(patient.patient)" />
    </div>

</template>


<script setup>
import Welcome from '@/components/Welcome.vue'
import Chat from '@/components/Chat.vue'
import Navbar from '@/components/Navbar.vue';
import InputBox from '@/components/InputBox.vue'
import Drawer from '@/components/Drawer.vue';

import { useChatStore, usePatientsStore, usePatientStore } from '@/stores';
import { isEmptyPatient } from '@/utils/util';


const chat = useChatStore()
const patient = usePatientStore()
</script> -->