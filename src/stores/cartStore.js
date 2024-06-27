//store to handle the cart. Every action will save the cart in the local storage
import { defineStore } from 'pinia'

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
    init() {
      if (localStorage.getItem('cart'))
        this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    addToCart(product, color, material, size, quantity) {
      const existingProduct = this.cart.find(
        (item) => item.product.id === product.id,
      )
      if (existingProduct) {
        existingProduct.quantity += quantity
        localStorage.setItem('cart', JSON.stringify(this.cart))
      } else {
        this.cart.push({ product, color, material, size, quantity })
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeFromCart(id) {
      this.cart = [...this.cart.filter((item) => item.product.id !== id)]
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
  },
})
