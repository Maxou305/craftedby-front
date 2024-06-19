import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

const apiUrl = import.meta.env.VITE_API_URL

export const Reduction = {
  ZOB: 100,
  JB: 0,
  THOMAS: 66,
  CAROLE: 1,
  GUNAL: 13,
}

//store to handle the cart. Every action will save the cart in the local storage
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
      if (localStorage.getItem('cart'))
        this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    addToCart(product, color, matter, size, quantity) {
      const existingProduct = this.cart.find(
        (item) => item.product.id === product.id,
      )
      if (existingProduct) {
        existingProduct.quantity += quantity
        localStorage.setItem('cart', JSON.stringify(this.cart))
      } else {
        this.cart.push({ product, color, matter, size, quantity })
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeFromCart(id) {
      this.cart = [...this.cart.filter((item) => item.product.id !== id)]
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
  },
})

// store to handle all the products (be careful with the async !!!!)
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

// store to handle the user (becareful with the async !!!!!)
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    getAuthUser() {
      if (localStorage.getItem('token') && this.token === null) {
        this.token = localStorage.getItem('token')
      }
      fetch(`${apiUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            this.user = json
            this.isAuthenticated = true
          } else {
            throw new Error('User not found')
          }
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    register(username, email, password) {
      return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('token', json.token)
          this.token = json.token
          this.isAuthenticated = true
          return 'ok'
        })
    },
    login(username, password) {
      return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('token', json.token)
          this.token = json.token
          this.isAuthenticated = true
          return 'ok'
        })
    },
    logout() {
      return fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('json', json)
          this.user = null
          this.isAuthenticated = false
          this.token = null
          localStorage.removeItem('token')
          return 'ok'
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
  },
})

// store used to handle orders
export const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: [],
    validatedOrderList: [],
    order: {},
    token: useUserStore().token,
  }),
  getters: {},
  actions: {
    getByUserId(id) {
      return fetch(`${apiUrl}/orders/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => res.json())
    },
    newOrder(user, creatorCode, reduction) {
      const store = useCartStore()
      this.order = {
        products: store.cart,
        price: store.totalPrice,
        isValidated: false,
        user,
        shippingCountry: null,
        shippingMode: null,
        shippingPrice: null,
        artisan: null,
        creatorCode,
        reduction,
      }
      this.orderList.push(this.order)
      localStorage.setItem('order', JSON.stringify(this.order))
      localStorage.setItem('orderList', JSON.stringify(this.orderList))
    },
    update(order, values) {
      this.order = { ...order, ...values }
      console.log('prout', this.order)
    },
    validateOrder(id) {
      const token = useUserStore().token
      const order = this.orderList.find((order) => order.id === id)

      order.isValidated = true
      order.products = order.products.map((product) => {
        return {
          id: product.product.id,
          price: product.product.price,
          color: product.color,
          matter: product.matter,
          size: product.size,
          quantity: product.quantity,
        }
      })
      order.user = {
        id: order.user.id,
        username: order.user.username,
        email: order.user.email,
      }

      fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          emptyCart()
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
  },
})

function emptyCart() {
  const cartStore = useCartStore()
  cartStore.cart = []
  localStorage.setItem('cart', JSON.stringify([]))
}
