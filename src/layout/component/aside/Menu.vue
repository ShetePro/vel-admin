<template>
  <div
    class="children-menu flex h-full flex-grow"
    :class="{
      horizontal: mode === 'horizontal',
      vertical: mode === 'vertical',
      'show-children-menu': isShowMenu,
      'single-menu': isSingleMenu,
      'light-menu': !isSingleMenu
    }"
  >
    <template v-if="!hideLogo">
      <Logo
        :show-label="!getMenuCollapse"
        v-if="isSingleMenu || LayoutModeTypeEnum.topLeftMenu === getSystemConfig.layoutMode"
      />
      <div
        v-else
        class="w-full h-[60px] text-xl flex flex-row items-center justify-center whitespace-nowrap"
      >
        Vue Vel Admin
      </div>
    </template>

    <el-menu
      :default-active="getCurrentRoute"
      style="border: none; width: 100%"
      class="layout-aside-menu w-full h-full"
      :collapse-transition="false"
      :collapse="getMenuCollapse"
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
import { computed, ref, toRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/store/modules/settings'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import { LayoutModeTypeEnum, MenuDataTypeEnum } from '@/enum/settingsEnum'
import { useLayoutStore } from '@/store/modules/layout'
import Logo from '@/layout/component/aside/Logo.vue'

const router = useRouter()
withDefaults(
  defineProps<{
    mode?: 'horizontal' | 'vertical'
    hideLogo?: boolean
  }>(),
  {
    mode: 'vertical',
    hideLogo: false
  }
)
const { getSystemConfig } = useSettingStore()
const { menuProps } = getSystemConfig
const getMenuExpand = toRef(useSettingStore(), 'getMenuExpand')
const layoutStore = useLayoutStore()
const getCurrentRoute = computed(() => {
  return router.currentRoute.value.fullPath
})
const rootMenuId = ref<string | undefined>()
const getMenuCollapse = computed(() => {
  return [LayoutModeTypeEnum.twoMenu, LayoutModeTypeEnum.topMenu].includes(getSystemConfig.layoutMode) ? false : !getMenuExpand.value
})

const menuData = computed(() => {
  let menus: MenuDataItem[] = []
  if (isSingleMenu.value) {
    menus = layoutStore.getMenuList || []
  } else if (rootMenuId.value) {
    menus = layoutStore.getMenuList?.find((menu) => menu.id === rootMenuId.value)?.children || []
  }
  console.log(menus,'menus')
  return clearBottomMenu(menus)
})

const asideWidth = computed(() => {
  return getMenuExpand.value ? getSystemConfig.menuWidth + 'px' : '5rem'
})


// 监听路由变化
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
  return [LayoutModeTypeEnum.singleMenu, LayoutModeTypeEnum.topMenu].includes(
    getSystemConfig.layoutMode
  )
})


const isShowMenu = computed(() => {
  const isHideMenu =
    !getMenuExpand.value && LayoutModeTypeEnum.twoMenu === getSystemConfig.layoutMode
  return menuData.value.length > 0 && !isHideMenu
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

watch(() => menuData.value.length, (value) => {
  layoutStore.showExpand = !!value
})
</script>

<style lang="scss" scoped>
.single-menu {
  --el-menu-bg-color: var(--menu-bg-color);
  --el-menu-text-color: #fff;
  --el-menu-active-color: #fff;
}
.children-menu {
  width: 0;
  opacity: 0;
  color: var(--el-menu-text-color);
  background-color: var(--menu-bg-color);
  overflow: hidden;
  transition: all .3s;
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
</style>
