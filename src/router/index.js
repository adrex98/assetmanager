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
    component: () => import(/* */ '../views/AreaView.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import(/* */ '../views/AssetView.vue')
  },
  {
    path: '/managers',
    name: 'Managers',
    component: () => import(/* */ '../views/ManagerView.vue')
  },
  {
    path: '/newAssets',
    name: 'New Assets',
    component: () => import(/* */ '../views/AssetRegistrationView.vue')  
  },
  {
    path: '/newAssetType',
    name: 'New Asset Type',
    component: () => import(/**/ '../views/AssetTypeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
