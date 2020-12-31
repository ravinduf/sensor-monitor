import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';

import './assets/main.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Navbar from './components/NavBar.vue'

Vue.config.productionTip = false

Vue.use(VueSweetalert2);

Vue.component('app-bar',Navbar);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
