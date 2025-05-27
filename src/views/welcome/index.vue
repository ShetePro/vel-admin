<template>
  <div class="flex flex-col w-full h-full p-2 box-border">
    <div class="flex flex-row items-center justify-between gap-5">
      <HomeCard title="用户数量" :num="2000" icon="heroicons:user-group-20-solid" iconColor="#8280FF" iconBackground="#E2E2FD" time-text="相较于上个月" rate="8.5" :rate-type="1" />
      <HomeCard title="订单数量" :num="2000" icon="garden:app-26" iconColor="#FEC53D" iconBackground="#FBF0D4" time-text="相较于上个月" rate="8.5" :rate-type="1" />
      <HomeCard title="销售金额" :num="2000" icon="lucide:chart-line" iconColor="#4AD991" iconBackground="#D5F4E6" time-text="相较于上个月" rate="8.5" :rate-type="1" />
      <HomeCard title="待处理数" :num="2000" icon="mdi:clock-arrow" iconColor="#FD9771" iconBackground="#FDDDD0" time-text="相较于上个月" rate="8.5" :rate-type="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeCard from '@/views/welcome/HomeCard.vue'
</script>

<style scoped></style>
