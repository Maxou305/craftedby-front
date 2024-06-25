<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useCartStore, useUserStore } from '@/stores.js'

const userStore = useUserStore()
const cartStore = useCartStore()
// TODO change name setCart and refacto stores
userStore.getAuthUser()
cartStore.setCart()
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
  <!--  TODO Refacto single name component-->
</template>
