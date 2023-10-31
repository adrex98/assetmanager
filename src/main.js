import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.min.css';
import 'materialize-css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
