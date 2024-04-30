import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import { fr } from '@formkit/i18n'
import App from './App.vue'
import router from "./router"
import LightModal from 'light-modal-vue3';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { VueSpinnersPlugin } from 'vue3-spinners';


const app = createApp(App)
app.use(router)
app.use(plugin, defaultConfig({
    locales: { fr },
    locale: 'fr',
}))
app.use(LightModal);
app.use(Vue3Toasity,
    { autoClose: 3000, }
)
app.use(VueSpinnersPlugin);

app.mount('#app')