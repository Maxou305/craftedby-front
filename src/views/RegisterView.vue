<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '@/components/LoaderComponent.vue'
import { useUserStore } from '@/stores/userStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const isTryingToRegister = ref(false)
const registerErrorMessages = ref('')

function handleRegister() {
  isTryingToRegister.value = !isTryingToRegister.value
  registerErrorMessages.value = null
  userStore
    .register(username.value, email.value, password.value)
    .then((res) => {
      if (!res.success) {
        registerErrorMessages.value = res.data
        isTryingToRegister.value = false
        return
      }
      router.push('/')
      window.location.reload()
    })
}
</script>

<template>
  <div class="m-auto my-4 mt-24 flex max-w-[1440px] flex-wrap p-4 font-nunito">
    <div v-if="!isAuthenticated" class="m-auto flex flex-col gap-4">
      <h1 class="text-title font-bold">Inscription</h1>
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
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
          />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
          />
        </svg>
        <input type="text" class="grow" placeholder="Email" v-model="email" />
      </label>
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
          value="password"
          v-model="password"
        />
      </label>

      <div
        v-for="message in registerErrorMessages"
        role="alert"
        class="alert alert-error mt-2"
        :key="message"
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
        <span>{{ message }}</span>
      </div>

      <div class="mt-4 text-center">
        <button
          class="btn bg-vermillon text-platinum hover:bg-platinum hover:text-vermillon"
          @click="handleRegister"
        >
          <span v-if="!isTryingToRegister">Connexion</span>
          <Loader v-else />
        </button>
      </div>
    </div>
    <div v-else class="m-auto flex flex-col gap-4">
      <div class="mt-4 text-center">
        <button
          class="btn bg-vermillon text-platinum hover:bg-platinum hover:text-vermillon"
          @click="$router.push('/')"
        >
          <span>Retour à l'accueil</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
