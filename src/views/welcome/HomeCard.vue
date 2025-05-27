<template>
  <div class="home-card">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col gap-3">
        <span class="text-md text-gray-400">{{title}}</span>
        <span class="text-3xl font-bold">{{num}}</span>
      </div>
      <div class="rounded-[30px] w-[80px] h-[80px] flex justify-center items-center" :style="{background: `${iconBackground}`}">
        <Icon :icon="icon" size="50" :color="iconColor"></Icon>
      </div>
    </div>
    <div>
      <div></div>
      <span>Up from yesterday</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon'

defineProps<{
  title: string
  num: string | number
  icon: string
  iconBackground: string
  iconColor: string
  timeText: string
  rate: string | number
  rateType: number
}>()
</script>

<style scoped>
.home-card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  padding: 20px;
  max-width: 20%;
  background: #fff;
  gap: 20px;
  border-radius: 20px;
}
</style>
