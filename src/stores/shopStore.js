import { defineStore } from 'pinia'
import { getCookie } from '@/stores/userStore.js'

const apiUrl = import.meta.env.VITE_API_URL

export const useShopStore = defineStore('shop', {
  state: () => ({
    shops: [],
    shop: {},
  }),
  getters: {},
  actions: {
    getAllShops() {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      fetch(`${apiUrl}/shops`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((json) => (this.shops = json))
    },
    getShopById(id) {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/shops/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
      })
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
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/shops/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
      })
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
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/shops`, {
        method: 'POST',
        body: JSON.stringify(newShop),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
      })
        .then((res) => {
          console.log('res', res)
          return res.json()
        })
        .then((json) => console.log('shop', json))
    },
  },
})
