<template>
  <div class="header h-full flex flex-col text-gray-950 dark:text-white relative">
    <div
      class="header-main flex flex-row justify-between items-center mb-2"
      :class="{
        'dark-bg': showTopMenu
      }"
    >
      <div class="ml-2 mr-3">
       <ExpandButton />
      </div>
      <Menu
        :hide-logo="getSystemConfig.layoutMode === LayoutModeTypeEnum.topLeftMenu"
        mode="horizontal"
        v-if="showTopMenu"
      />
      <ParentMenu
        mode="horizontal"
        v-if="LayoutModeTypeEnum.topLeftMenu === getSystemConfig.layoutMode"
      />
      <div class="flex flex-row items-center h-full mr-1">
        <!--        <Notify />-->
        <User />
        <WebSetting />
      </div>
    </div>
    <Tabs v-if="getSystemConfig.showNavs" />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/layout/component/header/navBar/Tabs.vue'
import User from '@/layout/component/header/components/User.vue'
// import Notify from "@/layout/component/header/components/Notify.vue";
import WebSetting from '@/layout/component/header/components/WebSetting.vue'
import { useSettingStore } from '@/store/modules/settings'
import { computed, toRef } from 'vue'
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import ParentMenu from '@/layout/component/aside/ParentMenu.vue'
import Menu from '@/layout/component/aside/Menu.vue'
import ExpandButton from "@/layout/component/ExpandButton.vue";

const { getSystemConfig } = useSettingStore()
const showTopMenu = computed(() => {
  return [LayoutModeTypeEnum.topMenu].includes(getSystemConfig.layoutMode)
})

</script>

<style lang="scss" scoped>
.header {
  &-main {
    background-color: var(--header-bg-color) !important;
    height: 60px;
  }
}
.dark-bg {
  --menu-bg-color: #303133;
  background-color: var(--menu-bg-color) !important;
  color: #fff;
}
.dark .dark-bg {
  --menu-bg-color: #141414;
}
</style>
