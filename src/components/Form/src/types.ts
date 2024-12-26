import { FormItemRule } from 'element-plus'

export type BasicFormOption = {
  labelWidth?: string | number
  labelPosition?: 'top' | 'right' | 'left'
  labelSuffix?: string
  disabled?: boolean
  inline?: boolean
  column: BasicFormColumnProps[]
}
export type BasicFormColumnProps = {
  label: string
  prop: string
  labelWidth?: string | number
  type?: 'text' | 'number' | 'select' | 'date' | 'switch' | 'radio' | 'upload'
  formatter?: (value: Recordable) => string
  placeholder?: string
  dataType?: BasicFormDataType
  on?: Recordable
  span?: number
  slot?: boolean
  props?: Recordable
  rules?: FormItemRule[]
  disabled?: boolean
  display?: boolean
  dictData?: Recordable[]
  dictUrl?: string
  dictMethod?: 'get' | 'post'
  dictQuery?: { data: Recordable; params: Recordable }
  dictResponseHandle?: (res: Recordable) => Recordable[]
  defaultValue?: string | number
  component?: string
  maxWidth?: string
  minWidth?: string
}

// 数据类型值
export type BasicFormDataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'

// 表单组件事件
export type BasicFormMethods = {
  getFormData: () => Recordable
  resetForm: VoidFunction
  submitForm: () => Promise<any>
  clearValidate: VoidFunction
}

// 搜索框组件事件
export type SearchFormMethods = {
  getData: () => Recordable
  reset: VoidFunction
  search: VoidFunction
}
