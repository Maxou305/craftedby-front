<script setup>
import CartProductCard from '@/components/CartProductCard.vue'

defineProps({
  cart: Array,
})
</script>
<template>
  <div class="flex flex-col gap-2">
    <CartProductCard
      v-for="product in cart"
      :product="product"
      :key="product.name"
    />
  </div>
</template>

<style scoped></style>
