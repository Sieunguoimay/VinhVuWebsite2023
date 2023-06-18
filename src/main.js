import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import $dataProvider from "./data"
import $eventBus from './events'
import store from './store'

import './assets/main.css'

var app = createApp(App);

app.config.globalProperties.$dataProvider = $dataProvider;
app.config.globalProperties.$eventBus = $eventBus;

app.use(store);
app.use(router);

app.mount('#app')