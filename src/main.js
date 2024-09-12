import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import storeSample from './store/sample'
import storeMain from './store/main'
import HighchartsVue from 'highcharts-vue';

createApp(App)
.use(storeSample)
.use(storeMain)
.use(HighchartsVue)
.use(router).mount('#app')
