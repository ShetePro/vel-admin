import { request } from "@/utils/http";

// 查询角色表列表
export function getRoleTypePage() {
  return request.post({
    url: "/rest/sys/role/getTree",
  });
}
// 获取角色选择框列表
export function getRoleTypeList() {
  return request.post({
    url: "/rest/sys/role/getTree",
    data: {}
  });
}
// 新增
export function addRoleApi(data: Recordable) {
  return request.post({
    url: "/rest/sys/role/add",
    data
  });
}
// 编辑
export function updateRoleApi(data: Recordable) {
  return request.post({
    url: "/rest/sys/role/update",
    data
  });
}

// 删除
export function deleteRoleApi(data: Recordable) {
  return request.post({
    url: `/rest/sys/role/delete`,
    data
  });
}
// 更新角色权限
export function updateRoleMenuApi(data: Recordable) {
  return request.post({
    url: "/rest/sys/role/update",
    data
  });
}
// 角色权限详情
export function detailRoleApi(data: Recordable) {
  return request.post({
    url: "/rest/sys/role/getDetail",
    data
  });
}
