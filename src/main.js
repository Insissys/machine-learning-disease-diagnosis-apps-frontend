import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/main.css";

// plugins
import setupPinia from "./plugins/pinia";
import setupFontAwesome from "./plugins/fontawesome";
import registerGlobalComponents from "./plugins/global-components";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

setupPinia(app);
setupFontAwesome(app);
registerGlobalComponents(app);

app.use(router);
app.use(VueApexCharts);
app.mount("#app");
app.component("apexchart", VueApexCharts);
