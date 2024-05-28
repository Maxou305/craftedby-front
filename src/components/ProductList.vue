<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores.js'
import { onMounted } from 'vue'

const store = useProductsStore()
onMounted(() => {
  store.fetchProducts()
})
</script>

<template>
  <h1 class="font-bold text-3xl">Meilleures ventes</h1>
  <div class="grid grid-cols-5 gap-2">
    <ProductCard
      v-for="product in store.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped></style>
