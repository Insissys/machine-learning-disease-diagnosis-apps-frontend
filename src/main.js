import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/* add icons to the library */
library.add(fas);

const app = createApp(App);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("vue-date-picker", VueDatePicker);

app.mount("#app");
