import { defineStore } from 'pinia'

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
      fetch(`${apiUrl}/shops/user/${userId}`)
        .then((res) => res.json())
        .then((json) => {
          this.shop = json
        })
        .catch((e) => console.log('Error : ', e))
    },
  },
})
