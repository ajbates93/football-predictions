import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/predictions',
    name: 'predictions',
    component: () => import('../pages/Predictions.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../pages/Settings.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})