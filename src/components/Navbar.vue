<script setup>
import { useUserStore } from '@/stores.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import { useCartStore } from '@/stores/cartStore.js'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

const isTryingToConnect = ref(false)

const username = ref('')
const password = ref('')
const loginErrorMessage = ref('')

function handleLogin() {
  isTryingToConnect.value = !isTryingToConnect.value
  loginErrorMessage.value = null
  userStore.login(username.value, password.value).then((res) => {
    if (res.message) {
      loginErrorMessage.value = res.message
      isTryingToConnect.value = false
      return
    }
    window.location.reload()
  })
}
function handleLogout() {
  userStore.logout().then(() => {
    router.push('/')
  })
}
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-space-cadet font-nunito">
    <div>
      <div class="z-50 m-auto flex max-w-[1440px] flex-row justify-between p-4">
        <RouterLink to="/" class="flex flex-wrap">
          <img class="w-32" src="../assets/images/logo.svg" alt="logo" />
        </RouterLink>
        <div class="search hidden rounded-2xl xl:flex">
          <select class="search w-16 rounded-l-2xl">
            <option selected></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <input type="search" placeholder="Search..." class="px-4 py-2" />
          <div
            class="search flex flex-wrap content-center rounded-l-2xl rounded-r-2xl px-4"
          >
            <RouterLink to="/">
              <img
                src="../assets/images/icons/search-icon.svg"
                class="icon"
                alt=""
              />
            </RouterLink>
          </div>
        </div>
        <div class="flex flex-wrap content-center gap-6 rounded-r-2xl">
          <RouterLink to="/register" v-if="!userStore.isAuthenticated"
            ><img
              class="icon"
              src="../assets/images/icons/add-icon.svg"
              alt="Créer un compte"
            />
          </RouterLink>

          <button
            v-if="!userStore.isAuthenticated"
            onclick="my_modal_2.showModal()"
          >
            <img
              src="../assets/images/icons/sign-up-icon.svg"
              class="icon"
              alt="sign up"
            />
          </button>

          <div
            class="dropdown dropdown-end dropdown-hover"
            v-if="userStore.isAuthenticated"
          >
            <button>
              <img
                src="../assets/images/icons/sign-in-icon.svg"
                class="icon"
                alt="sign up"
              />
            </button>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li><router-link to="/profile">Profile</router-link></li>
              <li>
                <button @click="handleLogout">Déconnexion</button>
              </li>
            </ul>
          </div>

          <div class="indicator">
            <span class="badge indicator-item badge-secondary">{{
              cartStore.cart.length
            }}</span>
            <RouterLink to="/cart"
              ><img
                class="icon"
                src="../assets/images/icons/cart-icon.svg"
                alt="cart"
            /></RouterLink>
          </div>
          <dialog id="my_modal_2" class="modal">
            <div class="bg-snow modal-box text-space-cadet">
              <h3 class="text-lg font-bold">Connexion</h3>
              <p class="py-4">username</p>
              <label class="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                  />
                </svg>
                <input
                  type="text"
                  class="grow"
                  placeholder="Username"
                  v-model="username"
                />
              </label>
              <p class="py-4">mot de passe</p>
              <label class="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  class="grow"
                  placeholder="Mot de passe"
                  v-model="password"
                />
              </label>

              <div
                v-if="loginErrorMessage"
                role="alert"
                class="alert alert-error mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ loginErrorMessage }}</span>
              </div>

              <div class="mt-4 text-center">
                <button class="btn bg-vermillon" @click="handleLogin">
                  <span v-if="!isTryingToConnect">Connexion</span>
                  <Loader v-else />
                </button>
              </div>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.search {
  background-color: var(--color-vermillon);
}
input {
  width: 700px;
}
.icon {
  width: 24px;
}
</style>
