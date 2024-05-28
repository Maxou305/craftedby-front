<script setup>
import CartSteps from '@/components/CartSteps.vue'
import CartProductList from '@/components/CartProductList.vue'
import CartRecommendations from '@/components/CartRecommendations.vue'
import CartSideInfos from '@/components/CartSideInfos.vue'
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores.js'

const steps = ref([
  { name: 'Panier', checked: true },
  { name: 'Authentification', checked: false },
  { name: 'Transport', checked: false },
  { name: 'Paiement', checked: false },
  { name: 'Confirmation', checked: false },
])

const store = useCartStore()
const cart = computed(() => store.cart)
console.log(cart)
</script>

<template>
  <div class="mt-24 w-[1440px] m-auto flex flex-col flex-wrap gap-4 my-4">
    <CartSteps :steps="steps" />
    <div class="grid grid-cols-[2fr,1fr] gap-2">
      <div class="flex flex-col">
        <CartProductList :cart="cart" />
        <CartRecommendations />
      </div>
      <CartSideInfos :cart="cart" :total="store.totalPrice" />
    </div>
  </div>
</template>

<style scoped></style>
