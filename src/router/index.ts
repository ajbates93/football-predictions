import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useAuthUser from '../composables/useAuthUser'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/predictions',
    name: 'predictions',
    component: () => import('../pages/Predictions.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../pages/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue')
  },
  { 
    path: '/email-confirmation',
    name: 'EmailConfirmation',
    component: () => import('../pages/EmailConfirmation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth)
    return { name: "home" }
})

export { router }