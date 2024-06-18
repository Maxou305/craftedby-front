<script setup>
import { useOrderStore, useUserStore } from '@/stores.js'

const userStore = useUserStore()
const orderStore = useOrderStore()
const user = userStore.user
</script>

<template>
  <div class="m-auto my-4 mt-24 flex w-[1440px] flex-wrap gap-4 font-nunito">
    <div class="text-center">
      <h1 class="text-title">Profile</h1>
      <h1>Username : {{ user.username }}</h1>
      <h1>Id : {{ user.id }}</h1>
      <h1>Email : {{ user.email }}</h1>
      <h1 class="text-title">Commandes</h1>
      <!--      <h1>{{ orderStore.getByUserId(user.id) }}</h1>-->
    </div>
  </div>
</template>

<style scoped></style>
