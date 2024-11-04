/**
 * 根据url 获取按钮权限
 * @param { String } url
 * @param { mode } mode 权限类型 create, update, delete
 */
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/store/modules/layout'
import { MenuDataItem } from '@/layout/component/aside/menuData'
import systemSettings from '@/config/system'

export type ButtonPermissionProps = {
  url: string
  mode: string
}

export function buttonPermissions({ url, mode }: ButtonPermissionProps) {
  const route = useRoute()
  const { menuList } = useLayoutStore()
  const path = url || route.path
  return menuList ? findPathPermissions(menuList, path, mode) : false
}

/**
 * 判断是否有按钮权限
 * @param { Array } menu 菜单集合
 * @param { String } url 权限页面url
 * @param { String } mode 权限类型 add, update, delete, audit
 */
export function findPathPermissions(menu: MenuDataItem[], url: string, mode: string) {
  const { type, path, children } = systemSettings.menuProps
  let flag = false
  if (Array.isArray(menu)) {
    flag = menu.some((item) => {
      if (item[path] === url) {
        if (item[children]) {
          return item[children].some((pms: any) => {
            // 取:后的文字作为类型
            const permissions = pms?.permissions?.split(':').pop()
            // 只有按钮类型菜单才通过
            return pms[type] === 1 && permissions === mode
          })
        }
      } else if (item[children]?.length) {
        return findPathPermissions(item[children], url, mode)
      }
    })
  }
  return flag
}
