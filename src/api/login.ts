import { UserLoginProps } from "@/layout/login/types";
import { request } from "@/utils/http";
export function loginUser(data: UserLoginProps) {
  return request.post({
    url: "/rest/auth/token",
    headers: {
      isToken: false,
      Authorization: `Basic ${btoa("aochen_web:123456")}`,
    },
    data: {
      ...data,
      grant_type: "password",
    },
    // 由于后端登录接口成功不会返回code 所以这里拦截响应并手动添加code
    transformResponse(data) {
      const info = JSON.parse(data);
      if (info.access_token) {
        info.code = 200;
      }
      return info;
    },
  });
}

export function getUserInfoByToken () {
  return request.post({
    url: '/rest/auth/user'
  })
}
// 登出接口
export function logoutUser () {
  return request.post({
    url: '/rest/auth/logout'
  })
}
// 根据opt 获取token
export function getTokenByOtp(otp: string) {
  return request.get({
    url: `/rest/auth/getTokenByOtp/${otp}`
  })
}
// 根据dingId 获取token
export function getTokenByDingId(dingUserId: string) {
  return request.post({
    url: `/rest/auth/getTokenByAccountId`,
    data: {
      dingUserId
    }
  })
}
