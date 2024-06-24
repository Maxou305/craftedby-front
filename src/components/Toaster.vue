<script setup>
defineProps({
  message: String,
})
</script>

<template>
  <div class="toast toast-end">
    <div class="alert alert-success">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped></style>
