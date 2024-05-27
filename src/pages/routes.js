import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import ProductPage from '@/pages/ProductPage.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: `/product/:id`,
    component: ProductPage,
    name: 'ProductPage',
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
