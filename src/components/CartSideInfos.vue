<script setup>
import { Reduction, useOrderStore, useUserStore } from '@/stores.js'
import { ref } from 'vue'

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

const creatorCode = ref(null)
const toto = ref(false)

const orderStore = useOrderStore()
const userStore = useUserStore()

function applyCode() {
  toto.value = true
  promo.value = Reduction[creatorCode.value.toUpperCase()]
  console.log(promo.value)
}

function handleClick() {
  orderStore.newOrder(userStore.user, creatorCode.value)
  props.handleNextStep()
  const order = orderStore.orderList[0]
  console.log('order', order)
}
</script>

<template>
  <div
    class="border bg-seasalt rounded-md text-center p-4 flex flex-col justify-between min-h-96"
  >
    <div class="gap-4 flex flex-col">
      <h1 class="font-bold">Récapitulatif de votre commande</h1>
      <div>
        <div v-for="product in props.cart">
          <div class="flex justify-between">
            <p>{{ product.product.title }}</p>
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
    <div v-if="!isPaymentStep || !toto" class="flex items-center gap-2">
      <input
        type="text"
        placeholder="CODE CREATEUR"
        class="input input-bordered w-full"
        v-model="creatorCode"
      />
      <button @click="applyCode" class="btn bg-emerald-300">Appliquer</button>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-bold text-title text-end">
        Total :
        {{
          promo === 0 ? props.total : props.total - (props.total * promo) / 100
        }}
        €
      </p>
      <button
        v-if="!isPaymentStep"
        class="btn bg-vermillon text-platinum hover:text-vermillon hover:bg-platinum"
        @click="handleClick"
      >
        Commander
      </button>
    </div>
  </div>
</template>

<style scoped></style>
