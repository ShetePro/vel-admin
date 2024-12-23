<template>
  <div
    class="aside flex flex-row w-full h-full"
    v-if="getSystemConfig.layoutMode !== LayoutModeTypeEnum.topMenu"
  >
    <ParentMenu v-if="getSystemConfig.layoutMode === LayoutModeTypeEnum.twoMenu" />
    <Menu :hide-logo="[LayoutModeTypeEnum.topMenu].includes(getSystemConfig.layoutMode)" />
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings'
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import ParentMenu from '@/layout/component/aside/ParentMenu.vue'
import Menu from "@/layout/component/aside/Menu.vue";

const { getSystemConfig } = useSettingStore()
</script>

<style lang="scss" scoped>
.aside {
}
</style>
