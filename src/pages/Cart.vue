<script setup>
import CartSteps from '@/components/CartSteps.vue'
import CartProductList from '@/components/CartProductList.vue'
import CartRecommendations from '@/components/CartRecommendations.vue'
import CartSideInfos from '@/components/CartSideInfos.vue'
import { ref } from 'vue'
import { useCartStore, useUserStore } from '@/stores.js'
import Shipping from '@/components/Shipping.vue'
import Payment from '@/components/Payment.vue'
import Confirmation from '@/components/Confirmation.vue'
import AuthForm from '@/components/AuthForm.vue'

const steps = ref([
  { name: 'Panier', checked: true },
  { name: 'Authentification', checked: false },
  { name: 'Transport', checked: false },
  { name: 'Paiement', checked: false },
  { name: 'Confirmation', checked: false },
])
const actualStep = ref(0)

const userStore = useUserStore()
const cartStore = useCartStore()

function handleNextStep() {
  if (actualStep.value === 0 && userStore.isAuthenticated) {
    actualStep.value += 1
    steps.value[actualStep.value].checked = true
  }
  actualStep.value += 1
  steps.value[actualStep.value].checked = true
}
</script>

<template>
  <div
    v-if="cartStore.cart.length === 0"
    class="mt-24 w-[1440px] m-auto flex flex-col justify-center gap-4 my-4"
  >
    <h1 class="text-center">Panier vide</h1>
    <div class="text-center">
      <router-link to="/">
        <button
          class="btn bg-vermillon text-platinum hover:text-vermillon hover:bg-platinum"
        >
          Voir les produits
        </button>
      </router-link>
    </div>
  </div>
  <div
    v-else
    class="mt-24 w-[1440px] m-auto flex flex-col flex-wrap gap-4 my-4"
  >
    <CartSteps :steps="steps" />
    <div class="grid grid-cols-[2fr,1fr] gap-2" v-if="actualStep === 0">
      <div class="flex flex-col">
        <CartProductList :cart="cartStore.cart" />
        <CartRecommendations />
      </div>
      <CartSideInfos
        :cart="cartStore.cart"
        :total="cartStore.totalPrice"
        :handleNextStep="handleNextStep"
      />
    </div>
    <AuthForm :handleNextStep="handleNextStep" v-if="actualStep === 1" />
    <Shipping :handleNextStep="handleNextStep" v-if="actualStep === 2" />
    <Payment :handleNextStep="handleNextStep" v-if="actualStep === 3" />
    <Confirmation :handleNextStep="handleNextStep" v-if="actualStep === 4" />
  </div>
</template>

<style scoped></style>
