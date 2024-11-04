import {
  BasicFormColumnProps,
  BasicFormDataType,
  BasicFormOption
} from '@/components/Form/src/types'
import { isArray, isNumber, isObject, isString } from '@/utils/is'
import { computed } from 'vue'
import { FormRules } from 'element-plus'
import { getEffectiveValue } from '@/utils/transform'
import { getValueType } from '@/utils/util'

// 设置表单数据对象默认数据
export function getFormDefault(
  formData: Recordable,
  column: BasicFormColumnProps[] = [],
  defaultValue = ''
) {
  const data: Recordable = {}
  if (!formData) formData = {}
  if (Array.isArray(column)) {
    column.forEach((col) => {
      if (isString(col.prop) || isNumber(col.prop)) {
        // 获取有效值
        const propValue = getEffectiveValue([formData[col.prop], col.defaultValue, defaultValue])
        data[col.prop] = col.dataType
          ? TransformByBataType(propValue, col.dataType || getValueType(propValue))
          : propValue
      }
    })
  }
  return data
}

// 根据dataType 转换数据
export function TransformByBataType(value: any, dataType: BasicFormDataType = 'string') {
  switch (dataType) {
  case 'string':
    return value ? value.toString() : value
  case 'number':
    return Number(value)
  case 'boolean':
    return !!value
  case 'array':
    return value || []
  case 'object':
    if (isArray(value)) {
      return value || []
    } else {
      return isObject(value) ? value : {}
    }
  }
}

export function getDefaultOption(option: Partial<BasicFormOption>): BasicFormOption {
  const defaultOption: BasicFormOption = {
    labelWidth: '120px',
    labelPosition: 'right',
    labelSuffix: '',
    disabled: false,
    inline: false,
    column: []
  }
  return {
    ...defaultOption,
    ...option,
    column: getDefaultColumn(option.column)
  }
}

// 处理column 设置默认参数
export function getDefaultColumn(column: BasicFormColumnProps[] = []): BasicFormColumnProps[] {
  return isArray(column)
    ? column.map((col) => {
      return {
        type: 'text',
        span: 12,
        display: true,
        ...col
      }
    })
    : []
}

export function getFormRule(column: BasicFormColumnProps[] = []): FormRules {
  const rules: FormRules = {}
  column.forEach((col) => {
    if (col.display && col.rules) {
      rules[col.prop] = col.rules
    }
  })
  return rules
}
export const getFormItemKey = computed(() => {
  return (col: BasicFormColumnProps) => {
    return col.prop + col.label
  }
})

export function getFormItemStyle(col: BasicFormColumnProps) {
  return {
    minWidth: col.minWidth,
    maxWidth: col.maxWidth
  }
}
