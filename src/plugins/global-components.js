import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default function registerGlobalComponents(app) {
  app.component("vue-date-picker", VueDatePicker);
}