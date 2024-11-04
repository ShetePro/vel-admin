import { defineStore } from 'pinia'
import { LayoutType } from '@/store/types'
import { TabsItemProps } from '@/layout/types'
import { useStorage } from '@vueuse/core'
import { NAVS_KEY } from '@/enum/cacheEnum'
import { getStorage, setStorage } from '@/utils/storage'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import router from '@/router'
import { getUserMenuList } from '@/api/sys/menu'
import { ref } from 'vue'
import { menuData } from '@/data/menuData'

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutType => ({
    navBars: new Map<string, TabsItemProps>(getStorage({ key: NAVS_KEY }) || []),
    menuList: null,
    finishMenuRequest: false,
    layoutWidth: 0,
    layoutHeight: 0,
    cachePages: new Set([]),
    passwordDialog: ref()
  }),
  getters: {
    getNavBars(state): Map<string, TabsItemProps> {
      return state.navBars
    },
    getMenuList(state): MenuDataItem[] | null {
      return state.menuList
    },
    getFinishMenuRequest(state): boolean {
      return state.finishMenuRequest
    },
    getCachePages(state): string[] {
      return Array.from(state.cachePages)
    }
  },
  actions: {
    setMenuList(data: Recordable | undefined) {
      this.menuList = data as MenuDataItem[]
    },
    addNavBar(data: TabsItemProps) {
      !this.navBars.has(data.path) && this.navBars.set(data.path, data)
      setStorage({
        key: NAVS_KEY,
        value: Array.from(this.navBars),
        storage: sessionStorage
      })
    },
    deleteNavBar(data: TabsItemProps) {
      this.navBars.delete(data.path)
      useStorage(NAVS_KEY, Array.from(this.navBars), sessionStorage)
    },
    closeLeftNavBar(data: TabsItemProps) {
      const currentPath = router.currentRoute.value.fullPath
      const keys = this.navBars.keys()
      for (const key of keys) {
        if (key === data.path) {
          break
        }
        this.navBars.delete(key)
        // 如果当前页面被删除就跳转到选中页面
        key === currentPath && router.push(data.path)
      }
      useStorage(NAVS_KEY, Array.from(this.navBars), sessionStorage)
    },
    closeRightNavBar(data: TabsItemProps) {
      const currentPath = router.currentRoute.value.fullPath
      const keys = this.navBars.keys()
      let flag = false
      for (const key of keys) {
        if (flag) {
          this.navBars.delete(key)
          key === currentPath && router.push(data.path)
        }
        if (key === data.path) {
          flag = true
        }
      }
      useStorage(NAVS_KEY, Array.from(this.navBars), sessionStorage)
    },
    closeOtherNavBar(data: TabsItemProps) {
      this.navBars.clear()
      this.navBars.set(data.path, data)
      useStorage(NAVS_KEY, Array.from(this.navBars), sessionStorage)
      router.push(data.path)
    },
    actionMenuData() {
      return new Promise((resolve) => {
        this.menuList = menuData
        this.finishMenuRequest = true
        resolve(this.menuList)
      })
    }
  }
})
