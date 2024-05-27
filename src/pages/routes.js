import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
