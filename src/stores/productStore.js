// store to handle all the products (be careful with the async !!!!)
import { defineStore } from 'pinia'

import { useFetch } from '@vueuse/core'

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
  },
})
