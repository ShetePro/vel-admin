import { BasicTableOptions } from '@/components/Table/src/types'
import { BasicFormOption } from '@/components/Form/src/types'
import { roleData } from "@/data/roleData";

export const tableOption: BasicTableOptions = {
  border: true,
  align: 'center',
  height: '100%',
  stripe: true,
  full: true,
  columns: [
    {
      label: 'AppKey',
      prop: 'appKey'
    },
    {
      label: '用户账号',
      prop: 'username'
    },
    {
      label: '用户姓名',
      prop: 'name'
    },
    {
      label: '联系方式',
      prop: 'mobile'
    },
    {
      label: '更新时间',
      prop: 'updateDate'
    },
  ]
}
