import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import Vuelidate from 'vuelidate';
import 'bootstrap/dist/css/bootstrap.min.css';

import VueAxios from 'vue-axios'
import axios from 'axios'

// Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app');
