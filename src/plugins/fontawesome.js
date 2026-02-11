import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function setupFontAwesome(app) {
  library.add(fas);
  app.component("font-awesome-icon", FontAwesomeIcon);
}