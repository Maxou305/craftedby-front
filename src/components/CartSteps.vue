<script setup>
const props = defineProps({
  steps: Array,
})
</script>

<template>
  <ul class="steps steps-horizontal m-auto lg:steps-horizontal">
    <li
      :class="{ step: true, 'step-primary': step.checked }"
      v-for="step in props.steps"
      :key="step.name"
    >
      {{ step.name }}
    </li>
  </ul>
</template>

<style scoped></style>
