<script setup>
import CartSideInfos from '@/components/CartSideInfos.vue'
import { useOrderStore } from '@/stores/orderStore.js'
import { ref } from 'vue'

const props = defineProps({
  handleNextStep: Function,
})

const orderStore = useOrderStore()

const order = orderStore.order
const isValidated = ref(false)

const total = order.price + order.shippingPrice

function handleClick() {
  orderStore.validateOrder(order)
  props.handleNextStep()
}
</script>

<template>
  <div class="grid grid-cols-1 gap-2 lg:grid-cols-[2fr,1fr]">
    <div
      class="flex h-auto flex-col gap-4 rounded-md border border-platinum bg-seasalt p-6 font-nunito"
    >
      <h1 class="text-title font-bold">Paiement</h1>
      <label>Nom sur la carte</label>
      <input type="text" class="input input-bordered w-auto" />
      <label>Numéro de carte</label>
      <input type="text" class="input input-bordered w-auto" />
      <div class="flex justify-between gap-4">
        <div class="flex flex-col gap-4">
          <label>Date d'expiration</label>
          <input type="text" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex flex-col gap-4">
          <label>CCV</label>
          <input type="text" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <input type="checkbox" class="checkbox" v-model="isValidated" />
        <p>
          J'accepte les conditions d'achats CRAFTEDBY, disponibles sur le
          <a
            class="underline"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"
            target="_blank"
            >lien suivant</a
          >*
        </p>
      </div>
      <button
        class="btn bg-vermillon text-platinum hover:bg-platinum hover:text-vermillon"
        @click="handleClick"
        :disabled="!isValidated"
      >
        Paiement
      </button>
    </div>
    <CartSideInfos
      :cart="order.products"
      :total="total"
      :handleNextStep="handleNextStep"
      :isPaymentStep="true"
      :shippingPrice="order.shippingPrice"
    />
  </div>
</template>

<style scoped></style>
