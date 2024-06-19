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
  <h1 class="text-3xl font-bold">Meilleures ventes</h1>
  <div
    class="xs:grid-cols-1 grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
  >
    <ProductCard
      v-for="product in store.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped></style>
