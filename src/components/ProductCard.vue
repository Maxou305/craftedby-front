<script setup>
const props = defineProps({
  product: {},
})
</script>

<template>
  <div
    class="rounded-2xl border p-4 gap-4 flex flex-wrap transition ease-in-out hover:shadow-xl bg-seasalt"
  >
    <div class="flex w-full items-center justify-around">
      <img
        class="rounded-2xl h-60 w-auto items-center"
        :src="props.product.image"
        :alt="props.product.title"
      />
    </div>
    <div class="flex flex-col justify-between gap-4">
      <div class="flex flex-wrap gap-4">
        <h2
          class="font-nunito font-bold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]"
        >
          {{ props.product.title }}
        </h2>
        <p class="font-nunito overflow-auto max-h-[100px]">
          {{ props.product.description }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p class="font-nunito font-bold text-xl">{{ props.product.price }} €</p>
        <button
          @click="$router.push(`/product/${props.product.id}`)"
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
