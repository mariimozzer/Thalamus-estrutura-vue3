import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVueNext from 'bootstrap-vue-next'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import store from './store'

const app = createApp(App).use(store)
app.use(router)
app.use(BootstrapVueNext)
app.mount('#app')
