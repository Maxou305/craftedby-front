import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import ProductPage from '@/views/ProductView.vue'
import Cart from '@/views/CartView.vue'
import Profile from '@/views/ProfileView.vue'
import Register from '@/views/RegisterView.vue'
import Shop from '@/views/ShopView.vue'

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
