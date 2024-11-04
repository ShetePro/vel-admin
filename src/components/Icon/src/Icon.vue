<template>
  <IconifyIcon :icon="getIcon" :width="props.size || 20" :height="props.size || 20" v-bind="attrs"></IconifyIcon>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {Icon as IconifyIcon} from '@iconify/vue'

const props = defineProps<{
  icon: string
  size?: number | string
  online?: boolean
}>()
const attrs = useAttrs()
const getIcon = computed(() => {
  return props.icon || ''
})
</script>

<style scoped>

</style>
