<template>
  <div
    v-if="
      layoutStore.layoutWidth > 600 &&
      getSystemConfig.layoutMode !== LayoutModeTypeEnum.topMenu &&
      layoutStore.showExpand
    "
  >
    <Icon
      class="cursor-pointer text-gray-600"
      :class="iconClass"
      :icon="settingStore.getMenuExpand ? 'ri:expand-left-fill' : 'ri:expand-right-fill'"
      size="20"
      @click="toggleMenuExpand"
    />
  </div>
</template>

<script setup lang="ts">
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import { Icon } from '@/components/Icon'
import { useLayoutStore } from '@/store/modules/layout'
import { useSettingStore } from '@/store/modules/settings'
const layoutStore = useLayoutStore()
const settingStore = useSettingStore()
const { getSystemConfig } = useSettingStore()
const { toggleMenuExpand } = settingStore
defineProps<{
  iconClass?: string
}>()
console.log(layoutStore.layoutWidth, getSystemConfig.layoutMode, layoutStore.showExpand)
</script>

<style scoped></style>
