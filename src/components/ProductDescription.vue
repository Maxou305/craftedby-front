<script setup>
const props = defineProps({
  description: String,
})
</script>

<template>
  <div
    class="h-auto border-2 rounded-2xl p-6 flex flex-col gap-4 border-platinum"
  >
    <h2 class="text-normal font-bold font-nunito">Notre produit</h2>
    <p class="font-nunito">
      {{ props.description }}
    </p>
    <h2 class="text-normal font-bold font-nunito">
      Caractéristiques du produit
    </h2>
    <p class="font-nunito">
      {{ props.description }}
    </p>
    <h2 class="text-normal font-bold font-nunito">Kikilafé</h2>
    <p class="font-nunito">
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped></style>
