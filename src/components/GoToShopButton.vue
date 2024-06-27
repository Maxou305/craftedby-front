<script setup>
defineProps({
  click: Function,
})
</script>

<template>
  <button
    @click="click"
    class="btn rounded-xl border border-space-cadet bg-seasalt"
  >
    Voir le shop
    <img src="/src/assets/images/icons/shop-icon.svg" alt="Voir le shop" />
  </button>
</template>

<style scoped></style>
