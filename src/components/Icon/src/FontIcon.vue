<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<style scoped>

</style>
