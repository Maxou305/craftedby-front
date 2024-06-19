<script setup>
const props = defineProps({
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
        :src="props.product.image"
        :alt="props.product.title"
      />
    </div>
    <div class="flex flex-col justify-between gap-4">
      <div class="flex flex-wrap gap-4">
        <h2
          class="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap font-nunito text-xl font-bold"
        >
          {{ props.product.title }}
        </h2>
        <p class="max-h-[100px] overflow-auto font-nunito">
          {{ props.product.description }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p class="font-nunito text-xl font-bold">{{ props.product.price }} €</p>
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
