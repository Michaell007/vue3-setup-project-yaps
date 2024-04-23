import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import { fr } from '@formkit/i18n'
import App from './App.vue'
import router from "./router"

const app = createApp(App)
app.use(router)
app.use(plugin, defaultConfig({
    locales: { fr },
    locale: 'fr',
}))
app.mount('#app')
