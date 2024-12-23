<template>
  <Icon
    v-if="
      layoutStore.layoutWidth > 600 &&
      getSystemConfig.layoutMode !== LayoutModeTypeEnum.topMenu &&
      layoutStore.showExpand
    "
    class="cursor-pointer text-gray-600"
    :icon="settingStore.getMenuExpand ? 'ri:expand-left-fill' : 'ri:expand-right-fill'"
    size="20"
    @click="toggleMenuExpand"
  />
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
</script>

<style scoped></style>
