<script setup>
import { Reduction, useOrderStore } from '@/stores/orderStore.js'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'

const props = defineProps({
  cart: Array,
  total: Number,
  handleNextStep: Function,
  isPaymentStep: {
    type: Boolean,
    default: false,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
})

const promo = ref(0)
const wrongCode = ref(null)

const creatorCode = ref('')
const toto = ref(false)

const orderStore = useOrderStore()
const userStore = useUserStore()

function applyCode() {
  promo.value = 0
  wrongCode.value = false
  if (Reduction[creatorCode.value.toUpperCase()]) {
    toto.value = true
    promo.value = Reduction[creatorCode.value.toUpperCase()]
  } else wrongCode.value = true
}

function handleClick() {
  orderStore.newOrder(
    userStore.user ? userStore.user.id : null,
    creatorCode.value,
    promo.value,
  )
  props.handleNextStep()
}
</script>

<template>
  <div
    class="flex min-h-96 flex-col justify-between rounded-md border bg-seasalt p-4 text-center"
  >
    <div class="flex flex-col gap-4">
      <h1 class="font-bold">Récapitulatif de votre commande</h1>
      <div>
        <div v-for="product in props.cart" :key="product.id">
          <div class="flex justify-between">
            <p>{{ product.product.name }}</p>
            <p class="font-bold">
              {{ product.product.price * product.quantity }} €
            </p>
          </div>
        </div>

        <div v-if="toto" class="flex justify-between">
          <p>Réduction</p>
          <p class="font-bold">{{ promo }} %</p>
        </div>
        <div v-if="isPaymentStep" class="flex justify-between">
          <p>Frais de port</p>
          <p class="font-bold">{{ shippingPrice }} €</p>
        </div>
      </div>
    </div>
    <div v-if="!isPaymentStep || !toto">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="CODE CREATEUR"
          class="input input-bordered w-full"
          v-model="creatorCode"
        />
        <button @click="applyCode" class="btn bg-emerald-300">Appliquer</button>
      </div>
      <p v-if="wrongCode" class="mt-2 text-vermillon">
        Ce code créateur n'existe pas !
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-end text-title font-bold">
        Total :
        {{
          promo === 0 ? props.total : props.total - (props.total * promo) / 100
        }}
        €
      </p>
      <button
        v-if="!isPaymentStep"
        class="btn bg-vermillon text-platinum hover:bg-platinum hover:text-vermillon"
        @click="handleClick"
      >
        Commander
      </button>
    </div>
  </div>
</template>

<style scoped></style>
