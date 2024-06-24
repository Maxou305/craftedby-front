import { defineStore } from 'pinia'
import { useUserStore } from '@/stores.js'

const apiUrl = import.meta.env.VITE_API_URL

export const useShopStore = defineStore('shop', {
  state: () => ({
    shops: [],
    shop: {},
  }),
  getters: {},
  actions: {
    getAllShops() {
      fetch(`${apiUrl}/shops`)
        .then((res) => res.json())
        .then((json) => (this.shops = json))
    },
    getShopById(id) {
      return fetch(`${apiUrl}/shops/${id}`)
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          this.shop = json
          return json
        })
        .catch((e) => console.log('Error : ', e))
    },
    getShopByUserId(userId) {
      return fetch(`${apiUrl}/shops/user/${userId}`)
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          this.shop = json
          return json
        })
        .catch((e) => console.log('Error : ', e))
    },
    newShop(newShop) {
      const token = useUserStore().token
      console.log('token', token)
      return fetch(`${apiUrl}/shops`, {
        method: 'POST',
        body: JSON.stringify(newShop),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          console.log('res', res)
          return res.json()
        })
        .then((json) => console.log('shop', json))
    },
  },
})
