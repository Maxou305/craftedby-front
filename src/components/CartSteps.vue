<script setup>
const props = defineProps({
  steps: Array,
})
</script>

<template>
  <ul class="steps steps-vertical lg:steps-horizontal m-auto">
    <li
      :class="{ step: true, 'step-primary': step.checked }"
      v-for="step in steps"
    >
      {{ step.name }}
    </li>
  </ul>
</template>

<style scoped></style>
