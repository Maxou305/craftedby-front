import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL
const csrfUrl = import.meta.env.VITE_API_CSRF_TOKEN_URL

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
      } else {
        return
      }
      return fetch(`${apiUrl}/me`, {
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
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    },
    async login(username, password) {
      await getCsrfToken()
      return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'same-origin',
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('token', json.token)
          this.token = json.token
          this.isAuthenticated = true
          return json
        })
        .catch((error) => {
          console.error('Error: ', error)
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
      return fetch(`${apiUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
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
  },
})

async function getCsrfToken() {
  return fetch(csrfUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => {
      window.cookie = res.headers.get('Set-Cookie')
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
}
