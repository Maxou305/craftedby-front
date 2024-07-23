import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL
const csrfUrl = import.meta.env.VITE_API_CSRF_TOKEN_URL

// store to handle the user (becareful with the async !!!!!)

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    getAuthUser() {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/me`, {
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
        .then((json) => {
          console.log('json', json)
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
    async register(username, email, password) {
      await this.getCsrfToken()
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          this.isAuthenticated = true
          this.getAuthUser()
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    async login(username, password) {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((json) => {
          this.isAuthenticated = true
          this.getAuthUser()
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    logout() {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((json) => {
          this.user = null
          this.isAuthenticated = false
          this.token = null
          localStorage.removeItem('token')
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    update(user, newValues) {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(`${apiUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': token,
          Origin: 'http://localhost',
        },
        credentials: 'include',
        body: JSON.stringify(newValues),
      })
        .then((res) => res.json())
        .then((json) => {
          this.user = json
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    async getCsrfToken() {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'))
      return fetch(csrfUrl, {
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
          console.log('res', res)
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
  },
})

export function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
