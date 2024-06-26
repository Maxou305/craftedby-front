import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomeView.vue'
import ProductPage from '@/pages/ProductView.vue'
import Cart from '@/pages/CartView.vue'
import Profile from '@/pages/ProfileView.vue'
import Register from '@/pages/RegisterView.vue'
import Shop from '@/pages/ShopView.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/product/:id',
    component: ProductPage,
    name: 'ProductPage',
    props: true,
  },
  {
    path: '/cart',
    component: Cart,
    name: 'Cart',
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
  },
  {
    path: '/shop/:id',
    component: Shop,
    name: 'Shop',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
