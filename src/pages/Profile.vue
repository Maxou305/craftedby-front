<script setup>
import { useOrderStore, useUserStore } from '@/stores.js'
import { ref } from 'vue'

const userStore = useUserStore()
const orderStore = useOrderStore()

const user = userStore.user
const orders = ref(null)

console.log('user', user)
orderStore.getByUserId(user.id).then((res) => (orders.value = res))
</script>

<template>
  <div class="m-auto my-4 mt-24 flex w-[1440px] flex-wrap gap-4 font-nunito">
    <div class="text-center">
      <h1 class="text-title">Profile</h1>
      <h1>Username : {{ user.username }}</h1>
      <h1>Id : {{ user.id }}</h1>
      <h1>Email : {{ user.email }}</h1>
      <h1 class="text-title">Commandes</h1>
      <h1>{{ orders }}</h1>
    </div>
  </div>
</template>

<style scoped></style>
