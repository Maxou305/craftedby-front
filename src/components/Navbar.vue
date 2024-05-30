<script setup>
import { useCartStore, useUserStore } from '@/stores.js'
import { ref } from 'vue'

const cartStore = useCartStore()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function handleClick() {
  userStore.login(username.value, password.value)
}
</script>

<template>
  <nav class="fixed w-full z-50 top-0 bg-space-cadet font-nunito">
    <div>
      <div class="flex justify-between flex-row p-4 w-[1440px] m-auto z-50">
        <RouterLink to="/" class="flex flex-wrap">
          <img class="w-32" src="../assets/images/logo.svg" alt="logo" />
        </RouterLink>
        <div class="flex rounded-2xl search">
          <select class="rounded-l-2xl search w-16">
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
            class="rounded-l-2xl search flex content-center flex-wrap px-4 rounded-r-2xl"
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
        <div class="flex gap-6 content-center flex-wrap rounded-r-2xl">
          <RouterLink to="/"
            ><img
              class="icon"
              src="../assets/images/icons/menu-icon.png"
              alt="menu"
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

          <div class="dropdown dropdown-hover" v-if="userStore.isAuthenticated">
            <button>
              <img
                src="../assets/images/icons/sign-in-icon.svg"
                class="icon"
                alt="sign up"
              />
            </button>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><router-link to="/profile">Profile</router-link></li>
              <li>
                <button @click="userStore.logout">Déconnexion</button>
              </li>
            </ul>
          </div>

          <div class="indicator">
            <span class="indicator-item badge badge-secondary">{{
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
            <div class="modal-box bg-snow text-space-cadet">
              <h3 class="font-bold text-lg">Connexion</h3>
              <p class="py-4">username</p>
              <label class="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
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
                  class="w-4 h-4 opacity-70"
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
              <div class="text-center mt-4">
                <button class="btn bg-vermillon" @click="handleClick">
                  Connexion
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
