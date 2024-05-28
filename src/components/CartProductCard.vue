<script setup>
import { useCartStore } from '@/stores.js'

const props = defineProps({
  product: {},
})
const total = props.product.product.price * props.product.quantity
const store = useCartStore()
</script>

<template>
  <div class="flex border-2 h-36 p-4 rounded-md">
    <div class="flex gap-4">
      <img
        :src="props.product.product.image"
        alt="{{props.product.product.title}}"
        class="object-contain"
      />
      <div class="flex flex-col justify-around font-nunito">
        <h2 class="text-bold">{{ props.product.product.title }}</h2>
        <p>Quantité : {{ props.product.quantity }}</p>
        <p>Taille : {{ props.product.size }}</p>
        <p>Prix unitaire : {{ props.product.product.price }} €</p>
      </div>
    </div>
    <div class="flex flex-col gap-4 items-end min-w-64 justify-between">
      <button @click="store.removeFromCart(props.product.product.id)">
        <img src="../assets/images/icons/trash-icon.svg" alt="supprimer" />
      </button>
      <p class="font-bold">Prix total : {{ total }} €</p>
    </div>
  </div>
</template>

<style scoped></style>
