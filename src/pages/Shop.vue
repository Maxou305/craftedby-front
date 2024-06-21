<script setup>
import { useShopStore } from '@/stores/shopStore.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductList from '@/components/ProductList.vue'

const route = useRoute()

const shopStore = useShopStore()
const isLoading = ref(true)

const shop = ref(null)

onMounted(async () => {
  shop.value = await shopStore.getShopById(route.params.id)
  isLoading.value = false
})
</script>

<template>
  <div
    class="m-auto my-4 mt-24 flex max-w-[1440px] flex-col flex-wrap gap-10 p-4 font-nunito"
    v-if="!isLoading"
  >
    <h1 class="text-center text-title font-bold">{{ shop.name }}</h1>
    <img class="object-cover" :src="shop.logo" alt="logo" />
    <h2 class="text-center text-bold font-bold">A propos</h2>
    <p>{{ shop.biography }}</p>
    <h2 class="text-center text-bold font-bold">L'équipe</h2>
    <!--    "user": {-->
    <!--    "id": "9c528f6c-f1d3-44b8-8f9f-69b625f5cc19",-->
    <!--    "username": "sirgunal38",-->
    <!--    "name": "Maxou&Gunal",-->
    <!--    "email": "monseigneur@test.com",-->
    <!--    "payment_address": null,-->
    <!--    "shipping_address": null,-->
    <!--    "phone_number": null,-->
    <!--    "profile_picture": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/088_f2.png"-->
    <!--    }-->
    <div v-if="shop.user">
      <p>username : {{ shop.user.name }}</p>
      <p>email : {{ shop.user.name }}</p>
      <img :src="shop.user.profile_picture" alt="profile picture" />
    </div>

    <img class="object-cover" :src="shop.logo" alt="logo" />
    <h2 class="text-center text-bold font-bold">Notre histoire</h2>
    <h2 class="text-center text-bold font-bold">Nos produits</h2>
    <ProductList :products="shop.products" />
    <div class="flex items-center justify-center p-9">
      <button
        class="btn max-w-80 bg-emerald-300 text-space-cadet hover:bg-platinum hover:text-vermillon"
      >
        Nous contacter
      </button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped></style>
