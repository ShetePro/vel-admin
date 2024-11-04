<template>
  <div
    class="single-menu-mode flex flex-row rounded-md border-solid border-2 border-gray-300"
    :class="{
      'layout-mode-active': active
    }"
    @click="handleClick"
  >
      <div class="w-2 h-full rounded-sm bg-blue-400"></div>
      <div class="flex flex-col flex-grow pl-0.5">
        <div class="w-full h-1 rounded[1px] bg-gray-300 mb-0.5"></div>
        <div class="flex flex-row flex-grow h-1/2">
          <div class="flex flex-col w-full h-full mr-0.5">
            <div class="flex flex-grow w-full h-2 bg-gray-300 mb-0.5"></div>
            <div class="flex flex-grow w-full h-4 bg-gray-300"></div>
          </div>
          <div class="flex flex-col w-full h-full justify-between">
            <div class="flex flex-grow h-2 bg-gray-300 mb-0.5"></div>
            <div class="flex flex-grow h-4 bg-gray-300 mb-0.5"></div>
            <div class="flex flex-grow h-4 bg-gray-300"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import { useSetting } from '@/hook/useSetting'
import { useSettingStore } from '@/store/modules/settings'
import { computed } from 'vue'

const { changeLayoutMode } = useSetting()
const systemConfig = useSettingStore().systemConfig
const active = computed(() => {
  return systemConfig.layoutMode === LayoutModeTypeEnum.singleMenu
})
function handleClick() {
  if (systemConfig.layoutMode !== LayoutModeTypeEnum.singleMenu) {
    changeLayoutMode(LayoutModeTypeEnum.singleMenu)
  }
}
</script>

<style scoped>
.single-menu-mode {
  width: 50px;
  height: 50px;
  padding: 5px;
  div {
    border-radius: 1px;
  }
}
</style>
