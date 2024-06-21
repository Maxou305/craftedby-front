<script setup>
import ProductCard from '@/components/ProductCard.vue'

// const store = useProductsStore()
// onMounted(() => {
//   store.fetchProducts()
// })

const props = defineProps({
  products: [],
})
</script>

<template>
  <div
    class="grid grid-cols-3 gap-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
  >
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped></style>
