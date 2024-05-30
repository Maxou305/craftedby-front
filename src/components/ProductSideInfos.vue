<script setup>
import { useCartStore } from '@/stores.js'
import { ref } from 'vue'

const props = defineProps({
  product: {},
})
const cart = useCartStore()
const color = ref('')
const matter = ref('')
const size = ref('')
const quantity = ref(0)
</script>

<template>
  <div
    class="border bg-seasalt rounded-2xl p-6 flex flex-col gap-4 border-platinum"
  >
    <div class="flex gap-4 justify-center items-center">
      <div class="flex items-center gap-2">
        <img src="../assets/images/icons/star-icon.svg" alt="star" />
        <p>{{ props.product.rating.rate }}/5</p>
      </div>

      <p>{{ props.product.rating.count }} avis</p>
    </div>
    <h2 class="text-bold font-bold">Couleur :</h2>
    <select v-model="color">
      <option>rouge</option>
      <option>vert</option>
      <option>bleu</option>
    </select>
    <h2 class="text-bold font-bold">Matière :</h2>
    <select v-model="matter">
      <option>Tissu</option>
      <option>Métal</option>
      <option>Bois</option>
    </select>
    <h2 class="text-bold font-bold">Taille :</h2>
    <select v-model="size">
      <option>S</option>
      <option>M</option>
      <option>L</option>
      <option>XL</option>
    </select>
    <h2 class="text-bold font-bold">Quantité :</h2>
    <select v-model="quantity">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
    <div class="flex justify-between">
      <div class="flex flex-col justify-end">
        <p class="text-bold font-bold">{{ props.product.price }} €</p>
        <p class="text-sm line-through text-platinum">
          {{ props.product.price }} €
        </p>
      </div>
      <div class="flex flex-col text-center gap-4">
        <p>
          {{ props.product.stock > 0 ? 'En stock !' : 'Plus disponible !' }}
        </p>
        <button
          class="btn bg-vermillon"
          @click="cart.addToCart(props.product, color, matter, size, quantity)"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  border: solid 1px black;
  padding: 4px;
  box-shadow: 0 0 5px var(--color-space-cadet);
}
</style>
