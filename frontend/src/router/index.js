import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import SensorCharts from "../views/SensorCharts";
import SensorTable from "../views/SensorTable";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/charts',
    name: 'SensorCharts',
    component: SensorCharts
  },
  {
    path: '/tables',
    name: 'SensorTable',
    component: SensorTable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
