<template>
  <div
    class="aside flex flex-row w-full h-full"
    v-if="getSystemConfig.layoutMode !== LayoutModeTypeEnum.topMenu"
  >
    <ParentMenu v-if="getSystemConfig.layoutMode === LayoutModeTypeEnum.twoMenu" />
    <Menu :hide-logo="[LayoutModeTypeEnum.topMenu].includes(getSystemConfig.layoutMode)" />
    <!--      <div-->
    <!--        class="flex flex-row items-center bg-white border-2 h-10 mt-2 mb-2 text-white cursor-pointer"-->
    <!--        @click="toggleMenuExpand"-->
    <!--        style="-->
    <!--        background-color: var(&#45;&#45;menu-bg-color);-->
    <!--        padding-left: var(&#45;&#45;el-menu-base-level-padding);-->
    <!--      "-->
    <!--      >-->
    <!--        <Icon-->
    <!--          class="ml-1 cursor-pointer min-w-fit"-->
    <!--          :icon="getMenuExpand ? 'ep:fold' : 'ep:expand'"-->
    <!--          size="30"-->
    <!--        />-->
    <!--        <span class="ml-2 whitespace-nowrap" v-show="getMenuExpand">收起侧边栏</span>-->
    <!--      </div>-->
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useSettingStore } from '@/store/modules/settings'
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
import ParentMenu from '@/layout/component/aside/ParentMenu.vue'
import Menu from "@/layout/component/aside/Menu.vue";

const { getSystemConfig } = useSettingStore()
const { toggleMenuExpand } = useSettingStore()
const getMenuExpand = toRef(useSettingStore(), 'getMenuExpand')
</script>

<style lang="scss" scoped>
.aside {
}
</style>
