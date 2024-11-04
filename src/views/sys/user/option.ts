import { BasicTableOptions } from '@/components/Table/src/types'
import { BasicFormOption } from '@/components/Form/src/types'
import { roleData } from "@/data/roleData";

export const searchOption: Partial<BasicFormOption> = {
  labelWidth: '80px',
  labelPosition: 'left',
  column: [
    {
      label: '用户账号',
      prop: 'username',
      span: 8,
      maxWidth: '300px',
      minWidth: '300px'
    }
  ]
}
export const tableOption: BasicTableOptions = {
  border: true,
  align: 'center',
  height: '100%',
  stripe: true,
  full: true,
  columns: [
    {
      label: '用户账号',
      prop: 'userName'
    },
    {
      label: '用户姓名',
      prop: 'name'
    },
    {
      label: "角色类型",
      prop: "roleIds",
      type: "select",
      dictData: roleData,
      props: {
        multiple: true,
        propsOption: {
          label: "roleName",
          value: "id",
        },
      },
    },
    {
      label: '联系方式',
      prop: 'phonenumber'
    },
    {
      label: '联系邮箱',
      prop: 'email'
    },
    {
      label: '操作',
      prop: 'menu',
      width: 250,
      slot: true
    }
  ]
}
