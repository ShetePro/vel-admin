import tableIcon from '@/assets/image/table-icon.svg?url'
export interface GlobalConfig {
    urlPrefix: string
    proxyPrefix: string | undefined
}

export const globalConfig: GlobalConfig = {
  // 接口前缀
  urlPrefix: '',
  // 代理头
  proxyPrefix: import.meta.env.VITE_APP_PREFIX
}

export const dictOption = {
  label: 'dictLabel',
  value: 'dictValue'
}
export const tableIconUrl =  tableIcon
