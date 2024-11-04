// map对象转成value数组
import { BasicTableColumn } from '@/components/Table/src/types'
import {isNullAndUnDef, isUnDef} from '@/utils/is'

export function mapValueToArr<T>(map: Map<string, T>): T[] {
  const arr: T[] = []
  map.forEach((item) => {
    arr.push(item)
  })
  return arr
}
// map对象转成key数组
export function mapKeyToArr<T>(map: Map<string, T>): string[] {
  return Array.from(map.keys())
}

// 获取table option props
export function setColumnProp(columns: BasicTableColumn[], option: Recordable[] = []) {
  const filterProp = ['menu']
  columns.forEach((column) => {
    const data: Recordable = {
      label: column.label,
      property: column.prop,
      children: []
    }
    // 判断分组
    if (column.children && column.children.length) {
      data.children = setColumnProp(column.children)
    }
    if (!filterProp.includes(column.prop)) {
      option.push(data)
    }
  })
  return option
}

// 返回数组中第一个有效值
export function getEffectiveValue(valueList: Recordable[]) {
  if (Array.isArray(valueList)) {
    return valueList.find((item) => item !== undefined && !isNullAndUnDef(item))
  }
  return valueList
}
