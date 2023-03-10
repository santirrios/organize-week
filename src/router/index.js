import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import ('../views/HomeView')
  },
  {
    path:'/logup',
    name:'logup',
    component: () => import ('../views/LogupView.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import ('../views/LoginView.vue')
  },
  {
    path:'/records',
    name:'records',
    component: () => import ('../views/RecordsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
