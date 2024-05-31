<script setup>
import { useOrderStore, useUserStore } from '@/stores.js'

const userStore = useUserStore()
const orderStore = useOrderStore()
const user = userStore.user
</script>

<template>
  <div class="mt-24 w-[1440px] m-auto flex flex-wrap gap-4 my-4 font-nunito">
    <div class="text-center">
      <h1 class="text-title">Profile</h1>
      <h1>Prénom : {{ user.name.firstname }}</h1>
      <h1>Nom : {{ user.name.lastname }}</h1>
      <h1>Email : {{ user.email }}</h1>
      <h1>Adresse : {{ user.address }}</h1>
      <h1 class="text-title">Commandes</h1>
      <h1>{{ orderStore.getByUserId(user.id) }}</h1>
    </div>
  </div>
</template>

<style scoped></style>
