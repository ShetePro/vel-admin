<template>
  <div
    class="children-menu flex h-full flex-grow"
    :class="{
      'horizontal': mode === 'horizontal',
      'vertical': mode === 'vertical',
      'show-children-menu': menuData.length > 0,
      'single-menu': isSingleMenu,
      'light-menu': !isSingleMenu
    }"
  >
    <template v-if="!hideLogo">
      <Logo :show-label="true" v-if="isSingleMenu || LayoutModeTypeEnum.topLeftMenu === getSystemConfig.layoutMode" />
      <div
        v-else
        class="w-full h-[60px] bg-white text-xl flex flex-row items-center justify-center whitespace-nowrap"
      >
        Vue Vel Admin
      </div>
    </template>

    <el-menu
      :default-active="getCurrentRoute"
      style="border: none; width: 100%"
      class="layout-aside-menu w-full h-full"
      router
      v-loading="loading"
      element-loading-background="transparent"
      :mode="mode"
      :popper-offset="12"
    >
      <MenuItem v-for="item in menuData" :key="item.id" :menu="item"></MenuItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import './menu.css'
import MenuItem from '@/layout/component/aside/MenuItem.vue'
import { computed, ref, toRef, useAttrs, watch } from "vue";
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/store/modules/settings'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import { LayoutModeTypeEnum, MenuDataTypeEnum } from '@/enum/settingsEnum'
import { useLayoutStore } from '@/store/modules/layout'
import Logo from '@/layout/component/aside/Logo.vue'

const router = useRouter()
const props = withDefaults(defineProps<{
  mode?: 'horizontal' | 'vertical'
  hideLogo?: boolean
}>(), {
  mode: 'vertical',
  hideLogo: false
})
const { getSystemConfig } = useSettingStore()
const { menuProps } = getSystemConfig
const attrs = useAttrs()
const getMenuExpand = toRef(useSettingStore(), 'getMenuExpand')
const layoutStore = useLayoutStore()
const getCurrentRoute = computed(() => {
  return router.currentRoute.value.fullPath
})
const rootMenuId = ref<string | undefined>()
const getMenuCollapse = computed(() => {
  return !getMenuExpand.value
})
watch(
  () => router.currentRoute.value,
  (current) => {
    const matched = current.matched
    rootMenuId.value = matched.find((item) => item.meta.id)?.meta.id as string
  },
  {
    immediate: true
  }
)
const isSingleMenu = computed(() => {
  return [LayoutModeTypeEnum.singleMenu, LayoutModeTypeEnum.topMenu].includes(getSystemConfig.layoutMode)
})
const menuData = computed(() => {
  let menus: MenuDataItem[] = []
  if (isSingleMenu.value) {
    menus = layoutStore.getMenuList || []
  } else if (rootMenuId.value) {
    menus = layoutStore.getMenuList?.find((menu) => menu.id === rootMenuId.value)?.children || []
  }

  return clearBottomMenu(menus)
})
const asideWidth = computed(() => {
  console.log(getSystemConfig.menuWidth)
  return getMenuExpand.value ? getSystemConfig.menuWidth + 'px' : '4rem'
})
// 清除权限菜单
function clearBottomMenu(menu: MenuDataItem[]) {
  const list: MenuDataItem[] = []
  menu?.forEach((item) => {
    const menuData: MenuDataItem = { ...item }
    if (menuData[menuProps.children]) {
      menuData.children = clearBottomMenu(menuData[menuProps.children])
    }
    ![MenuDataTypeEnum.button].includes(menuData[menuProps.type]) && list.push(menuData)
  })
  return list
}
const loading = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.single-menu {
  --el-menu-bg-color: #303133;
  --el-menu-text-color: #fff;
  --el-menu-active-color: #fff;
}
.children-menu {
  width: 0;
  transition: all 0.3s;
  opacity: 0;
  color: var(--el-menu-text-color);
  background-color: var(--el-menu-bg-color);
}
.horizontal {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.vertical {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.show-children-menu {
  width: v-bind(asideWidth);
  opacity: 1;
}
:deep .el-sub-menu.is-active {
  svg {
    color: var(--el-color-primary);
  }
}
</style>
