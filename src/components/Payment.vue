<script setup>
import CartSideInfos from '@/components/CartSideInfos.vue'
import { useOrderStore, useUserStore } from '@/stores.js'

const props = defineProps({
  handleNextStep: Function,
})

const orderStore = useOrderStore()
const userStore = useUserStore()

const user = userStore.user
const order = orderStore.getByUserId(user.id)

const total = order.price + order.shippingPrice

function handleClick() {
  orderStore.validateOrder(order.id)
  console.log('final', orderStore.getByUserId(user.id))
  props.handleNextStep()
}
</script>

<template>
  <div class="grid grid-cols-[2fr,1fr] gap-2">
    <div
      class="h-auto border bg-seasalt rounded-md p-6 flex flex-col gap-4 border-platinum font-nunito"
    >
      <h1 class="font-bold text-title">Paiement</h1>
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
      <div class="flex gap-4 items-center">
        <input type="checkbox" checked="checked" class="checkbox" />
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
        class="btn bg-vermillon text-platinum hover:text-vermillon hover:bg-platinum"
        @click="handleClick"
      >
        Paiement
      </button>
    </div>
    <CartSideInfos
      :cart="order.cart"
      :total="total"
      :handleNextStep="handleNextStep"
      :isPaymentStep="true"
      :shippingPrice="order.shippingPrice"
    />
  </div>
</template>

<style scoped></style>
