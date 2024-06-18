import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

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
  getters: {},
  actions: {
    async fetchProducts() {
      const { data } = await useFetch(process.env.BASE_URL + '/products')
        .get()
        .json()
      this.products = data
    },
    async getById(id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
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
      return fetch('https://fakestoreapi.com/auth/login', {
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
          save('token', json.token)
          this.token = json.token
          this.isAuthenticated = true
          return 'ok'
        })
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})

// store used to handle orders
export const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: [],
    validatedOrderList: [],
  }),
  getters: {},
  actions: {
    getByUserId(id) {
      return this.orderList.find((order) => order.user.id === id)
    },
    newOrder(user, creatorCode, reduction) {
      const store = useCartStore()
      const order = {
        cart: store.cart,
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
      this.orderList.push(order)
      save('orderList', this.orderList)
    },
    validateOrder(id) {
      const order = this.orderList.find((order) => order.id === id)
      order.isValidated = true
      this.validatedOrderList.push(order)
      save('validatedOrderList', this.validatedOrderList)
      emptyCart()
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

function emptyCart() {
  const cartStore = useCartStore()
  cartStore.cart = []
  save('cart', cartStore.cart)
}
