<template>
  <div
    class="parent-menu h-full flex flex-grow"
    :class="{
      horizontal: mode === 'horizontal',
      vertical: mode === 'vertical'
    }"
  >
    <div class="flex flex-col items-center w-full pb-5" v-if="mode === 'vertical'">
      <Logo :showLabel="false" />
      <div class="flex flex-col items-center gap-3 mt-2 flex-grow">
        <div
          class="root-menu-box text-white rounded-md"
          :class="{
            'is-active': getActiveRootId === menu.id
          }"
          v-for="menu in getRootMenu"
          :key="menu.id"
          @click="changeRootMenu(menu)"
        >
          <el-icon class="m-0.5" v-if="menu[menuProps.icon]" size="20">
            <Icon class="z-10" :icon="menu[menuProps.icon]" />
          </el-icon>
          <span class="flex flex-row items-center justify-center w-8 text-center">{{
            menu[menuProps.name]
          }}</span>
        </div>
      </div>
      <div class="root-menu-box text-white rounded-md is-active flex justify-center">
        <ExpandButton class="text-white pt-2 pb-2" />
      </div>
    </div>
    <el-tabs
      v-model="getActiveRootId"
      class="menu-tabs w-full h-full pl-2 pr-2"
      @tab-click="changeRootMenu"
      v-else
    >
      <el-tab-pane
        :label="menu[menuProps.name]"
        :name="menu.id"
        v-for="menu in getRootMenu"
        :key="menu.id"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import './menu.css'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/store/modules/settings'
import Logo from '@/layout/component/aside/Logo.vue'
import { computed } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'
import { MenuDataTypeEnum } from '@/enum/settingsEnum'
import { Icon } from '@/components/Icon'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import ExpandButton from '@/layout/component/ExpandButton.vue'
const { mode } = withDefaults(
  defineProps<{
    mode: 'horizontal' | 'vertical'
  }>(),
  {
    mode: 'vertical'
  }
)
const router = useRouter()
const { getSystemConfig } = useSettingStore()
const { menuProps } = getSystemConfig
const layoutStore = useLayoutStore()
const getRootMenu = computed(() => {
  return layoutStore.menuList?.filter((item) => item[menuProps.type] === MenuDataTypeEnum.menu)
})
const getActiveRootId = computed(() => {
  const matched = router.currentRoute.value.matched
  const rootRoute = matched.find((item) => item.meta.id)
  return rootRoute?.meta.id
})
function changeRootMenu(menu: MenuDataItem) {
  let menuData =
    mode === 'horizontal' ? getRootMenu.value?.find((item) => item.id === menu.paneName) : menu
  if (!menuData) return
  const children = menuData[menuProps.children]
  if (children?.length > 0) {
    const route = children[0]
    router.push(route[menuProps.path])
  } else {
    router.push(menuData[menuProps.path])
  }
}
</script>

<style lang="scss" scoped>
.vertical {
  background: var(--menu-bg-primary-color);
  width: 60px;
}
.horizontal {
  width: 100%;
}
.parent-menu {
  .root-menu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 2px 2px 3px 2px;
    background: transparent;
    transition: background-color 0.3s;
    &:hover {
      background: var(--primary-color);
    }
  }
  .is-active {
    background: var(--primary-color);
  }
}
:deep .menu-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  .el-tabs__header {
    width: 100%;
    height: 100%;
    margin: 0;
    :after {
      background-color: transparent;
    }
  }
  .el-tabs__item {
  }
  .el-tabs__content {
    display: none;
  }
}
:deep .el-sub-menu.is-active {
  svg {
    color: var(--el-color-primary);
  }
}
</style>
