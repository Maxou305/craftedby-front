import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import ProductPage from '@/pages/ProductPage.vue'
import Cart from '@/pages/Cart.vue'

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
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
