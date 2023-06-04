import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import $dataProvider from "./data"

import './assets/main.css'

var app = createApp(App);

app.config.globalProperties.$dataProvider = $dataProvider;

app.use(router);

app.mount('#app')
