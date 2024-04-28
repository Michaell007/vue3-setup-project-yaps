import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import { fr } from '@formkit/i18n'
import App from './App.vue'
import router from "./router"
import LightModal from 'light-modal-vue3';


const app = createApp(App)
app.use(router)
app.use(plugin, defaultConfig({
    locales: { fr },
    locale: 'fr',
}))
app.use(LightModal);

app.mount('#app')