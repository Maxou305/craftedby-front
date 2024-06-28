// store to handle all the products (be careful with the async !!!!)
import { defineStore } from 'pinia'

import { useFetch } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore.js'

const apiUrl = import.meta.env.VITE_API_URL
export const useProductsStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      const { data } = await useFetch(`${apiUrl}/products`).get().json()
      this.products = data
    },
    async getById(id) {
      const response = await fetch(`${apiUrl}/products/${id}`)
      return await response.json()
    },
    getByCategory(category) {
      return this.filter((product) => product.category === category)
    },
    createProduct(product) {
      const token = useUserStore().token
      return fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('Product created: ', json)
        })
    },
  },
})
