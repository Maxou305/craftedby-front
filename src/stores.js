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
    setCart() {
      if (this.cart.length === 0) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    },
    addToCart(product, color, matter, size, quantity) {
      const existingProduct = this.cart.find(
        (item) => item.product.id === product.id,
      )
      if (existingProduct) {
        existingProduct.quantity += quantity
        save(this.cart)
      } else {
        this.cart.push({ product, color, matter, size, quantity })
        save(this.cart)
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.product.id !== id)
      save(this.cart)
    },
  },
})

export const useProductsStore = defineStore('product', {
  state: () => ({
    products: [],
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
    async fetchProducts() {
      const { data } = await useFetch('https://fakestoreapi.com/products')
        .get()
        .json()
      this.products = data
    },
  },
})

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    getAuthUser() {
      let userId = 0
      if (localStorage.getItem('token') && this.token === null) {
        this.token = localStorage.getItem('token')
        userId = decode(this.token).sub
      }
      fetch(`https://fakestoreapi.com/users/${userId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            console.log(json)
            this.user = json
            console.log()
            this.isAuthenticated = true
          } else {
            throw new Error('User not found')
          }
        })
        .catch((error) => {
          console.error('Error : ', error)
        })
    },
    login(username, password) {
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('token', json.token)
          this.token = json.token
          const decoded = decode(json.token)
        })
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
    },
  },
})

function save(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

function decode(token) {
  return JSON.parse(
    decodeURIComponent(
      atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    ),
  )
}
