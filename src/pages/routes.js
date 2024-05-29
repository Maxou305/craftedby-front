import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ProductPage from '@/pages/ProductPage.vue'
import Cart from '@/pages/Cart.vue'
import Profile from '@/pages/Profile.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
