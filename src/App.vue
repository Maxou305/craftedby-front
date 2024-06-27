<script setup>
import Navbar from '@/components/NavbarCustom.vue'
import Footer from '@/components/FooterCustom.vue'
import { useCartStore } from '@/stores/cartStore.js'
import { useUserStore } from '@/stores/userStore.js'

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
