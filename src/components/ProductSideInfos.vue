<script setup>
import { ref } from 'vue'
import Toaster from '@/components/ToasterComponent.vue'
import { useCartStore } from '@/stores/cartStore.js'

const props = defineProps({
  product: {},
})
const cart = useCartStore()
const color = ref('')
const matter = ref('')
const size = ref('')
const quantity = ref(0)

const productAdded = ref(false)

function handleClick() {
  const q = quantity.value
  cart.addToCart(props.product, color, matter, size, q)
  displayToaster('Produit ajouté au panier !')
  quantity.value = 0
}

function displayToaster() {
  productAdded.value = true
  setTimeout(() => {
    productAdded.value = false
  }, 3000)
}
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-2xl border border-platinum bg-seasalt p-6"
  >
    <Toaster v-if="productAdded" :message="'Produit ajouté au panier !'" />
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center gap-2">
        <img src="../assets/images/icons/star-icon.svg" alt="star" />
        <!--        <p>{{ props.product.rating.rate }}/5</p>-->
      </div>

      <!--      <p>{{ props.product.rating.count }} avis</p>-->
    </div>
    <h2 class="text-bold font-bold">Couleur :</h2>
    <select v-model="color">
      <option>{{ props.product.color }}</option>
    </select>
    <h2 class="text-bold font-bold">Matière :</h2>
    <select v-model="matter">
      <option>{{ props.product.material }}</option>
    </select>
    <h2 class="text-bold font-bold">Taille :</h2>
    <select v-model="size">
      <option>{{ props.product.size }}</option>
    </select>
    <h2 class="text-bold font-bold">Quantité :</h2>
    <input
      type="number"
      min="0"
      :max="props.product.stock"
      v-model="quantity"
    />
    <div class="flex justify-between">
      <div class="flex flex-col justify-end">
        <p class="text-bold font-bold">{{ props.product.price }} €</p>
        <p class="text-sm text-platinum line-through">
          {{ props.product.price }} €
        </p>
      </div>
      <div class="flex flex-col gap-4 text-center">
        <p>
          {{
            props.product.stock > 0
              ? `En stock ! ${props.product.stock} exemplaires restants`
              : 'Plus disponible !'
          }}
        </p>
        <button
          class="btn bg-vermillon"
          @click="handleClick"
          :disabled="!props.product.stock || quantity === 0"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
select,
input {
  border: solid 1px black;
  padding: 4px;
  box-shadow: 0 0 5px var(--color-space-cadet);
}
</style>
