<script setup>
import { useCartStore } from '@/stores/cartStore.js'

const props = defineProps({
  product: {},
})
const total = props.product.product.price * props.product.quantity
const store = useCartStore()
</script>

<template>
  <div class="flex h-36 rounded-md border bg-seasalt p-4">
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
    <div class="flex min-w-64 flex-col items-end justify-between gap-4">
      <button @click="store.removeFromCart(props.product.product.id)">
        <img src="../assets/images/icons/trash-icon.svg" alt="supprimer" />
      </button>
      <p class="font-bold">Prix total : {{ total }} €</p>
    </div>
  </div>
</template>

<style scoped></style>
