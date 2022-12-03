import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import Vuelidate from 'vuelidate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
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
