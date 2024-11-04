import { request } from '@/utils/http'

//  获取菜单下拉树列表
export function getMenuAllTree() {
  return request.post({
    url: '/rest/sys/menu/getTree'
  })
}
// 获取路由信息
export function getUserMenuList() {
  return request.get({
    url: '/menu',
  })
}
// 加载对应角色菜单列表树
export function getMenuTreeByRole(roleId: string) {
  return request.get({
    url: `/rest/sys/menu/getMenuListByRoleId/${roleId}`
  })
}
// 新增菜单
export function addMenuApi(data: Recordable) {
  return request.post({
    url: '/menu',
    data
  })
}
// 编辑菜单
export function updateMenuApi(data: Recordable) {
  return request.put({
    url: '/menu',
    data
  })
}
// 删除菜单
export function deleteMenuApi(data: Recordable) {
  return request.delete({
    url: `/menu/${data.id}`,
    data
  })
}
// 菜单详情
export function detailMenuApi(data: Recordable) {
  console.log(data);
  return request.get({
    url: `/menu/${data.id}`,
    data
  })
}

//根据角色id查询菜单树
export function getMenuListByRoleId(roleId: string) {
  return request.get({
    url: `/rest/sys/menu/getMenuListByRoleId/${roleId}`
  })
}
