import { createApp } from 'vue'
import { createPinia } from 'pinia'


import './style.css'
import vuetify from './theme/vuetify'

import '@mdi/font/css/materialdesignicons.css'


import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
