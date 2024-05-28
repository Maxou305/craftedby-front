<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { useFetch } from '@vueuse/core'
import { useProductsStore } from '@/stores.js'
import { onMounted } from 'vue'

const { data: products } = useFetch('https://fakestoreapi.com/products').json()

// const store = useProductsStore()
// onMounted(() => {
//   store.fetchProducts()
//   console.log(products)
// })
</script>

<template>
  <h1 class="font-bold text-3xl">Meilleures ventes</h1>
  <div class="grid grid-cols-5 gap-2">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped></style>
