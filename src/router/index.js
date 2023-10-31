import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/areas',
    name: 'Areas',
    component: () => import(/* webpackChunkName: "about" */ '../views/AreaView.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import(/* webpackChunkName: "about" */ '../views/AssetView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
