import { Router } from 'vue-router'
import { useLayoutStore } from '../store/modules/layout'
import { dynamicAddRoute } from "./dynamicRouter"
import { useUserStore } from '../store/modules/user'
import { PageEnum } from '../enum/pageEnum'
import { goReLogin } from "@/utils/util";

export function registerGuard(router: Router) {
  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    const { actionMenuData, getMenuList, setMenuList } = useLayoutStore()
    const { otpToken, dingUserId } = to.query
    const { getToken, setToken } = useUserStore()
    // 单点登陆逻辑
    if (otpToken || dingUserId) {
      // 登陆清除 菜单数据和token 防止使用原来token 进行请求
      setMenuList([])
      setToken('')
      // 清除权限路由
      router.getRoutes().some(item => {
        if (item.name === "Redirect") {
          return true
        }else {
          item.name && router.removeRoute(item.name)
          return false
        }
      })
    }
    if (getToken) {
      // 请求菜单数据
      if (!getMenuList && to.path !== PageEnum.BASE_LOGIN) {
        await actionMenuData()
        const { menuList } = useLayoutStore()
        menuList && dynamicAddRoute(menuList)
        return next({ ...to, replace: true })
      } else {
        return next()
      }
    } else if (to.path !== PageEnum.BASE_LOGIN) {
      goReLogin()
    }
    return next()
  })
  // 全局解析守卫
  router.beforeResolve(async (to) => {
    const { meta } = to
    if (meta.isTab) {
      // 添加导航栏
      const { addNavBar } = useLayoutStore()
      addNavBar({
        name: to.name as string,
        path: to.path
      })
    }
  })
}
