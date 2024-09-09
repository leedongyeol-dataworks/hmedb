import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import storeSample from './store/sample'
import storeMain from './store/main'

createApp(App).use(storeSample).use(storeMain).use(router).mount('#app')
