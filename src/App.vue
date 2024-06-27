<script setup>
import { useCartStore } from '@/stores/cartStore.js'
import { useUserStore } from '@/stores/userStore.js'
import FooterCustom from '@/components/FooterCustom.vue'
import NavbarCustom from '@/components/NavbarCustom.vue'

const userStore = useUserStore()
const cartStore = useCartStore()
// TODO change name setCart and refacto stores
userStore.getAuthUser()
cartStore.setCart()
</script>

<template>
  <NavbarCustom />
  <RouterView />
  <FooterCustom />
</template>
