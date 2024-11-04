<template>
  <div
    class="top-left-menu-mode flex flex-col rounded-md border-solid border-2 border-gray-300"
    :class="{
      'layout-mode-active': active
    }"
    @click="handleClick"
  >
    <div class="flex flex-col pt-0.5">
      <div class="w-full h-1 rounded[1px] bg-blue-400 mb-0.5">
      </div>
      <div class="flex flex-row flex-grow w-full h-1/2">
        <div class="flex w-2 h-full bg-gray-300 mr-0.5 rounded-[1px]">
          <div class="w-full h-[8px] bg-blue-400 relative top-2"></div>
        </div>
        <div class="flex flex-col flex-grow h-full mr-0.5">
          <div class="flex flex-grow w-full h-2 bg-gray-300 mb-0.5"></div>
          <div class="flex flex-grow w-full h-3 bg-gray-300"></div>
        </div>
        <div class="flex flex-col flex-grow h-full justify-between">
          <div class="flex flex-grow h-2 bg-gray-300 mb-0.5"></div>
          <div class="flex flex-grow h-3 bg-gray-300 mb-0.5"></div>
          <div class="flex flex-grow h-4 bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import { useSettingStore } from '@/store/modules/settings'
import { computed } from 'vue'
import { useSetting } from '@/hook/useSetting'
const { changeLayoutMode } = useSetting()
const systemConfig = useSettingStore().systemConfig
const active = computed(() => {
  return systemConfig.layoutMode === LayoutModeTypeEnum.topLeftMenu
})
function handleClick() {
  if (systemConfig.layoutMode !== LayoutModeTypeEnum.topLeftMenu) {
    changeLayoutMode(LayoutModeTypeEnum.topLeftMenu)
  }
}

</script>

<style scoped>
.top-left-menu-mode {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 5px;
  div {
    border-radius: 1px;
  }
}
</style>
