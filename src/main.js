import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import storeSample from "./store/sample";
import storeMain from "./store/main";
import HighchartsVue from "highcharts-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'remixicon/fonts/remixicon.css'

createApp(App)
  .use(storeSample)
  .use(storeMain)
  .use(HighchartsVue)
  .use(ElementPlus)
  .use(router)
  .mount("#app");
