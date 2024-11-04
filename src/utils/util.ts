import { isObject } from '@/utils/is'
import router from "../router";

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * 将对象作为参数添加到URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * 格式化时间
 * 调用formatDate(strDate, 'yyyy-MM-dd');
 * @param strDate（中国标准时间、时间戳等）
 * @param strFormat（返回格式）
 */
export function dateFormat(strDate: any, strFormat?: any) {
  if (!strDate) {
    return
  }
  if (!strFormat) {
    strFormat = 'yyyy-MM-dd'
  }
  switch (typeof strDate) {
  case 'string':
    strDate = new Date(strDate.replace(/-/, '/'))
    break
  case 'number':
    strDate = new Date(strDate)
    break
  }
  if (strDate instanceof Date) {
    const dict: any = {
      yyyy: strDate.getFullYear(),
      M: strDate.getMonth() + 1,
      d: strDate.getDate(),
      H: strDate.getHours(),
      m: strDate.getMinutes(),
      s: strDate.getSeconds(),
      MM: ('' + (strDate.getMonth() + 101)).substring(1),
      dd: ('' + (strDate.getDate() + 100)).substring(1),
      HH: ('' + (strDate.getHours() + 100)).substring(1),
      mm: ('' + (strDate.getMinutes() + 100)).substring(1),
      ss: ('' + (strDate.getSeconds() + 100)).substring(1)
    }
    return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
      return dict[arguments[0]]
    })
  }
}

// 二进制数据转base64
export function blobToDataURI(blob: Blob, callback: Function) {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function (e) {
    if (e?.target?.result) {
      callback(e.target.result)
    }
  }
}

/**
 * 生成随机len位数字
 */
export function randomLenNum(len = 10, date = false) {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

// 获取数据类型
export function getValueType(value: Recordable | undefined) {
  return typeof value
}

// 驼峰风格转为下划线风格
export function camelToUnderscore(str: string) {
  return str.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
}
// 比特转mb
export function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2) // 保留两位小数
}

// 计算两个时间间隔天数
export function getSpacingDay(start: string, end: string) {
  const st = new Date(start).getTime()
  const et = new Date(end).getTime()
  const space = Math.abs(et - st)
  const day = space / (1000 * 60 * 60 * 24)
  return day
}

// 认证失效重新登陆地址
export function goReLogin () {
  // window.location.href = 'http://usercenter.aochensoft.com/'
  // window.location.href = 'http://115.233.229.211:30002/usercenter/#/login'
  router.push('/login')
}
