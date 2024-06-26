<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores.js'
import { useCartStore } from '@/stores/cartStore.js'

const userStore = useUserStore()
const cartStore = useCartStore()

userStore.getAuthUser()
cartStore.setCart()
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>
