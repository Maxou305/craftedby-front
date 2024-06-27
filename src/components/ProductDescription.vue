<script setup>
defineProps({
  description: String,
})
</script>

<template>
  <div
    class="flex h-auto flex-col gap-4 rounded-2xl border border-platinum bg-seasalt p-6"
  >
    <h2 class="font-nunito text-normal font-bold">Notre produit</h2>
    <p class="font-nunito">
      {{ description }}
    </p>
    <h2 class="font-nunito text-normal font-bold">
      Caractéristiques du produit
    </h2>
    <p class="font-nunito">
      {{ description }}
    </p>
    <h2 class="font-nunito text-normal font-bold">Kikilafé</h2>
    <p class="font-nunito">
      {{ description }}
    </p>
  </div>
</template>

<style scoped></style>
