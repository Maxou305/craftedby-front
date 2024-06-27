<script setup>
import CartProductCard from '@/components/CartProductCard.vue'

const props = defineProps({
  cart: Array,
})
</script>
<template>
  <div class="flex flex-col gap-2">
    <CartProductCard
      v-for="product in props.cart"
      :product="product"
      :key="product.name"
    />
  </div>
</template>

<style scoped></style>
