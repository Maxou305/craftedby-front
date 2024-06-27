import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
import { useCartStore } from '@/stores/cartStore.js'

const apiUrl = import.meta.env.VITE_API_URL

export const Reduction = {
  ZOB: 100,
  JB: 0,
  THOMAS: 66,
  CAROLE: 1,
  GUNAL: 13,
}

// store used to handle orders
export const useOrderStore = defineStore('order', {
  state: () => ({
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
    newOrder(userId, creatorCode, reduction) {
      const store = useCartStore()
      this.order = {
        products: store.cart,
        price: store.totalPrice,
        validatedStatus: false,
        userId,
        artisan: null,
        creatorCode,
        reduction,
      }
      localStorage.setItem('order', JSON.stringify(this.order))
    },
    update(order, values) {
      this.order = { ...order, ...values }
      localStorage.setItem('order', JSON.stringify(this.order))
    },
    validateOrder(order) {
      const token = useUserStore().token

      order.validatedStatus = true
      order.products = order.products.map((product) => {
        return {
          id: product.product.id,
          price: product.product.price,
          color: product.color,
          material: product.material,
          size: product.size,
          quantity: product.quantity,
        }
      })

      fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then(() => {
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
