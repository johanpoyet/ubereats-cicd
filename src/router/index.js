import Vue from 'vue'
import VueRouter from 'vue-router'
import { authService } from '@/services/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/LoginPage.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/restaurant/:id',
    name: 'RestaurantDetail',
    component: () => import('@/components/RestaurantDetail.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route nécessite une authentification
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Route pour les utilisateurs non connectés (login)
    if (isAuthenticated) {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
