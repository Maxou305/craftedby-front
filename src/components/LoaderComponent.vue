<script setup>
defineProps({
  size: {
    type: String,
    default: 'lg',
  },
})
</script>

<template>
  <span class="loading loading-{{size}} loading-spinner text-platinum"></span>
</template>

<style scoped></style>
