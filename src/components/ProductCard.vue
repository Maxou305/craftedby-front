<script setup>
defineProps({
  product: {},
})
</script>

<template>
  <div
    class="flex flex-wrap gap-4 rounded-2xl border bg-seasalt p-4 transition ease-in-out hover:shadow-xl"
  >
    <div class="flex w-full items-center justify-around">
      <img
        class="h-60 w-auto items-center rounded-2xl object-cover"
        :src="product.image"
        :alt="product.title"
      />
    </div>
    <div class="flex w-full flex-col justify-between gap-4">
      <div class="flex flex-wrap gap-4">
        <h2
          class="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap font-nunito text-xl font-bold"
        >
          {{ product.title }}
        </h2>
        <p class="max-h-[100px] overflow-auto font-nunito">
          {{ product.description }}
        </p>
      </div>
      <div class="flex w-auto items-center justify-between">
        <p class="font-nunito text-xl font-bold">{{ product.price }} €</p>
        <button
          @click="$router.push(`/product/${product.id}`)"
          class="btn bg-vermillon"
        >
          Voir le produit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: white;
}
</style>
