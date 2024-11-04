import router from './index'
import systemSettings from '../config/system'
import { RouteRecordRaw } from 'vue-router'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import { MenuDataTypeEnum } from '@/enum/settingsEnum'

// 动态路由实现
export function dynamicAddRoute(menuData: MenuDataItem[]) {
  setMenuRoute(menuData)
  // 添加默认页面
  router.addRoute({
    path: systemSettings.defaultPage,
    name: '默认页面',
    // 重定向到第一个动态路由
    redirect: router.getRoutes()[0].path
  })
  // 添加404页面路由
  router.addRoute({
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../layout/404.vue'),
    meta: {
      keepAlive: 0,
      isTab: false,
      transition: 'slide-right'
    }
  })
}

// 循环添加路由
function setMenuRoute(menuData: MenuDataItem[], parentPath = 'HomeLayout') {
  const { path, children, name, meta, type } = systemSettings.menuProps
  menuData.forEach((item) => {
    // 设置菜单才可现实
    if (item[type] === MenuDataTypeEnum.menu) {
      const isChild = item.children.some((route) => route[type] === MenuDataTypeEnum.menu)
      const pathName = `../views${item[path]}.vue`
      const metaData = {
        keepAlive: 0,
        isTab: true,
        transition: 'slide-right',
        id: item.id,
        ...item[meta]
      }
      let route: RouteRecordRaw
      // 叶子路由才动态导入组件
      if (isChild) {
        route = {
          path: item[path],
          name: item[name],
          meta: metaData,
          redirect: ''
        }
      } else {
        route = {
          path: item[path],
          name: item[name],
          component: import.meta.glob(`../views/**`)[pathName],
          meta: metaData
        }
      }
      // 添加路由
      router.addRoute(parentPath, route)
      // 递归添加子路由
      if (isChild) {
        setMenuRoute(item[children], item[name])
      }
    }
  })
}
