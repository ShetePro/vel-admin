// 修改密码
import { request } from "@/utils/http";


const BASE_URL = "/rest/sys/user"

// 获取用户列表
export function getUserListApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/getList`,
    data
  });
}
// 新增用户
export function addUserApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/add`,
    data
  });
}

// 修改
export function updateUserApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/update`,
    data
  });
}
// 删除
export function deleteUserApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/${data}`,
    data
  });
}
// 详情
export function detailUserApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/getDetail`,
    data
  });
}
// 重置密码
export function resetUserPassword (data: Recordable) {
  return request.post({
    url: '/rest/sys/user/resetPwd',
    data
  })
}

// 修改密码
export function changeUserPassword (data: Recordable) {
  return request.post({
    url: '/rest/auth/changePassword',
    data
  })
}
