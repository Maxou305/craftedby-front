<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores/productStore.js'

const product = ref({})

function handleClick() {
  console.log(product.value)
  useProductsStore().createProduct(product.value)
}
</script>

<template>
  <div class="card-body flex flex-col">
    <h2>Ajouter un produit</h2>
    <input
      type="text"
      class="input input-bordered w-full"
      placeholder="Nom"
      @change="product.name = $event.target.value"
    /><input
      type="text"
      class="input input-bordered w-full"
      placeholder="Catégorie"
      @change="product.category = $event.target.value"
    />
    <textarea
      placeholder="Description"
      class="textarea textarea-bordered textarea-lg w-full"
      @change="product.description = $event.target.value"
    ></textarea>
    <textarea
      placeholder="Story"
      class="textarea textarea-bordered textarea-lg w-full"
      @change="product.story = $event.target.value"
    ></textarea>
    <input
      type="number"
      class="input input-bordered w-full"
      placeholder="Prix"
      @change="product.price = $event.target.value"
    /><input
      type="number"
      class="input input-bordered w-full"
      placeholder="Stock"
      @change="product.stock = $event.target.value"
    />
    <input
      type="text"
      class="input input-bordered w-full"
      placeholder="Image"
      @change="product.image = $event.target.value"
    />
    <div class="flex w-full justify-around pb-4">
      <button @click="handleClick" class="btn w-auto bg-emerald-300">
        Créer le produit
      </button>
    </div>
  </div>
</template>

<style scoped></style>
