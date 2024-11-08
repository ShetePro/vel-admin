import { PaginationProps, TableColumnCtx, TableProps } from 'element-plus'
import { UseTableRegisterProps } from '@/hook/useTable'

export interface BasicTableProps {
  register: () => UseTableRegisterProps<any>
  options?: BasicTableOptions
  data?: Recordable[]
  title?: string
  showPagination?: boolean
  pagination?: PaginationProps & {
    currentChange?: () => void
    sizeChange?: () => void
  }
}
export type BasicTableOptions = {
  width?: string
  height: number | string
  columns: BasicTableColumn[]
  align: 'center' | 'right' | 'left'
  stripe?: boolean
  border?: boolean
  rowKey?: string
  full?: boolean
} & Partial<TableProps<any>>
export type BasicTableColumn = BasicTableColumnProp
export type BasicTableColumnProp = {
  label: string
  prop: string
  type?: 'text' | 'select'
  slot?: boolean
  dictData?: Recordable[]
  dictUrl?: string
  dictMethod?: 'get' | 'post'
  dictQuery?: { data: Recordable; params: Recordable }
  dictResponseHandle?: (res: Recordable) => Recordable[]
  display?: boolean
  width?: string | number
  align?: string
  children?: BasicTableColumnProp[]
  props?: Recordable
}
