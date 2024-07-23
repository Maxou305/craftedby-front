// store to handle all the products (be careful with the async !!!!)
import { defineStore } from 'pinia'

import { useFetch } from '@vueuse/core'
import { getCookie, useUserStore } from '@/stores/userStore.js'
import { useShopStore } from '@/stores/shopStore.js'

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
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
        body: JSON.stringify(product),
      })
        .then((res) => {
          return useShopStore().shop.products.push(res.json())
        })
        .catch((error) => console.error('Error: ', error))
    },
  },
})
