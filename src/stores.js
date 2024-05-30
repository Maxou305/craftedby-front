import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

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
        save('cart', this.cart)
      } else {
        this.cart.push({ product, color, matter, size, quantity })
        save('cart', this.cart)
      }
    },
    removeFromCart(id) {
      this.cart = [...this.cart.filter((item) => item.product.id !== id)]
      save('cart', this.cart)
    },
  },
})

// store to handle all the products (be careful with the async !!!!)
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
          save('token', json.token)
          this.token = json.token
        })
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
      console.log('Le user est déco ! Pour preuve : ', this.user)
    },
  },
})

// store used to handle orders
export const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: [],
  }),
  getters: {},
  actions: {
    getByUserId(id) {
      return this.orderList.find((order) => order.user.id === id)
    },
    newOrder(
      cart,
      price,
      isValidated,
      user,
      shippingCountry,
      shippingMode,
      artisan = null,
    ) {
      const order = {
        cart,
        price,
        isValidated,
        user,
        shippingCountry,
        shippingMode,
        artisan,
      }
      this.orderList.push(order)
      save('orderList', this.orderList)
    },
  },
})

function save(id, item) {
  localStorage.setItem(id, JSON.stringify(item))
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
