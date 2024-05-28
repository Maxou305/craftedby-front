import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      )
    },
  },
  actions: {
    addToCart(product, color, matter, size, quantity) {
      const existingProduct = this.cart.find(
        (item) => item.product.id === product.id,
      )
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        this.cart.push({ product, color, matter, size, quantity })
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.product.id !== id)
    },
  },
})

export const useProductsStore = defineStore('products', {
  state: () => ({
    state: () => ({
      products: [],
      isLoading: false,
      error: null,
    }),
  }),
  getters: {
    getById(id) {
      return this.filter((product) => product.id === id)
    },
    getByCategory(category) {
      return this.filter((product) => product.category === category)
    },
  },
  actions: {
    fetchProducts() {
      try {
        const { data: data } = useFetch(
          'https://fakestoreapi.com/products',
        ).then((data) => (this.products = data))
        // this.products = data
        this.error = null
      } catch (error) {
        console.log(error)
        return error
      } finally {
        this.isLoading = false
      }
    },
  },
})
