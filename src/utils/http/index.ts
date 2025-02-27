// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './types'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './axios'
import { checkStatus } from './checkStatus'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enum/httpEnum'
import { isString } from '@/utils/is'
import { createNow } from './helper'
import { PageEnum } from '@/enum/pageEnum'
import { useMessage } from '@/hook/useMessage'
import { useRouter } from 'vue-router'
import { globalConfig } from '@/config/global'
import { useUserStore } from '@/store/modules/user'
import { deepMerge, setObjToUrlParams } from '@/utils/util'
const prefix = globalConfig.urlPrefix
const errorResult = '__ERROR_RESULT__'
const { message: elMessage } = useMessage()
const router = useRouter()
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求响应数据
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      // 不进行任何处理，直接返回
      return res.data
    }
    const { data, status } = res
    if (!data) {
      return errorResult
    }
    //  这里 code，result，message为 后台返回的字段
    let { msg } = data
    const code = Number(status)

    // 判断请求是否成功
    const hasSuccess = data && code === ResultEnum.SUCCESS
    if (!hasSuccess) {
      if (code === ResultEnum.TOKEN_ERROR) {
        router.push(PageEnum.BASE_HOME)
      }
      if (msg) {
        // 提示错误信息
        elMessage(msg, {
          type: 'error'
        })
      }
      checkStatus(code, msg)
      return Promise.reject(new Error(errorResult))
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return {
        code,
        data,
        message: msg
      }
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR || code === ResultEnum.TIMEOUT) {
      return Promise.reject(new Error(errorResult))
    }
    return errorResult
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { getToken } = useUserStore()
    const { apiUrl, joinPrefix, joinParamsToUrl, joinTime = true } = options
    joinPrefix && (config.url = `${prefix}${config.url}`)
    // 请求之前处理config
    const token = `bearer ${getToken}`
    if (config.headers) {
      config.headers.Authorization = config.headers.Authorization || token
    } else {
      config.headers = {
        Authorization: token
      }
    }
    // 添加代理头
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`
        config.params = undefined
      }
    } else {
      //POST请求处理 headers
      if (config.method?.toUpperCase() !== RequestEnum.GET) {
        if (!config.headers) {
          config.headers = { 'Content-Type': ContentTypeEnum.OCTET_STREAM }
        }
      }
      if (!isString(params)) {
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data)
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    console.log(error)
    const { response } = error || {}
    const msg: string = response?.data?.msg ?? ''
    // 提示错误信息
    elMessage(msg, {
      type: 'error'
    })
    // 处理指定错误码
    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // 设置30秒超时
        timeout: 30 * 1000,
        // 基础接口地址
        // baseURL: globalConfig.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        prefixUrl: prefix,
        // 数据处理方式
        transform,
        // 默认header 参数
        headers: {},
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 代理头
          apiUrl: globalConfig.proxyPrefix,
          //  是否加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true
        }
      },
      opt || {}
    )
  )
}

export const request = createAxios()
