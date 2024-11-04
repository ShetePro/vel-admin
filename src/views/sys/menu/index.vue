<template>
  <div class="view flex flex-col">
    <SearchForm v-model="searchData" :option="searchOption" @search="getList"></SearchForm>
    <BasicTable class="h-full" :register="register" hide-pagination>
      <template #title>
        <div class="flex flex-row justify-between">
          <div class="text-2xl flex-ac">
            <img :src="tableIconUrl" width="40" alt="table" />
            <span class="ml-2">菜单列表</span>
          </div>
          <PermissionButton
            permission="create"
            label="新增"
            type="primary"
            class="mr-5"
            @click="handleCreate({ id: '-1' })"
          />
        </div>
      </template>
      <template #menu="{ row }">
        <div class="flex-ac">
          <IconButton
            icon="ic:round-add"
            type="success"
            permission="create"
            label="新增"
            @action="handleCreate(row)"
          ></IconButton>
          <IconButton
            icon="material-symbols:edit-note"
            label="编辑"
            permission="update"
            @action="handleUpdate(row)"
          ></IconButton>
          <IconButton
            icon="fluent:apps-list-detail-24-regular"
            type="info"
            label="详情"
            @action="handleDetail(row)"
          ></IconButton>
          <IconButton
            icon="material-symbols:delete-outline"
            type="danger"
            permission="delete"
            label="删除"
            @action="handleDelete(row)"
          ></IconButton>
        </div>
      </template>
    </BasicTable>
    <MenuAddDialog ref="menuAddDialog" :menu-data="getData()" @reload="getList" />
  </div>
</template>

<script setup lang="ts">
import BasicTable from '@/components/Table'
import { BasicTableOptions } from '@/components/Table/src/types'
import { useTable } from '@/hook/useTable'
import IconButton from '@/components/IconButton/index.vue'
import { useMessage } from '@/hook/useMessage'
import MenuAddDialog from '@/views/sys/menu/MenuAddDialog.vue'
import { ref } from 'vue'
import SearchForm from '@/components/Form/src/SearchForm.vue'
import { BasicFormOption } from '@/components/Form/src/types'
import { tableIconUrl } from '@/config/global'
import PermissionButton from '@/components/Button/PermissionButton.vue'
import { menuData } from '@/data/menuData'
import { MenuDataItem } from '@/layout/component/aside/menuData'
const { message, confirm } = useMessage()
const menuAddDialog = ref()
const searchOption: Partial<BasicFormOption> = {
  labelWidth: '80px',
  labelPosition: 'left',
  column: [
    {
      label: '菜单名称',
      prop: 'menuName',
      span: 8,
      maxWidth: '300px',
      minWidth: '300px'
    }
  ]
}
const tableOptions: BasicTableOptions = {
  border: true,
  align: 'center',
  height: '100%',
  stripe: true,
  full: true,
  rowKey: 'id',
  columns: [
    {
      label: '菜单名称',
      prop: 'menuName'
    },
    {
      label: '菜单类型',
      prop: 'type',
      type: 'select',
      dictData: [
        { label: '菜单', value: 0 },
        { label: '按钮', value: 1 }
      ]
    },
    {
      label: '菜单路径',
      prop: 'menuPath'
    },
    {
      label: '菜单权限',
      prop: 'permissions'
    },
    {
      label: '排序',
      prop: 'sort'
    },
    {
      label: '路由缓存',
      prop: 'keepAlive',
      type: 'select',
      dictData: [
        { label: '缓存', value: true },
        { label: '不缓存', value: false }
      ]
    },
    {
      label: '操作',
      prop: 'menu',
      width: 250,
      slot: true
    }
  ]
}

const { register, setLoading, getList, searchData, getData, setData } = useTable<MenuDataItem>({
  options: tableOptions
})
setData(menuData)
function handleCreate(row = { id: '-1' }) {
  menuAddDialog.value?.open(
    {
      parentId: row.id
    },
    'create'
  )
}
function handleUpdate(rowData: Recordable) {
  menuAddDialog.value?.open(rowData, 'update')
}
function handleDetail(rowData: Recordable) {
  menuAddDialog.value?.open(rowData, 'detail')
}
function handleDelete(rowData: Recordable) {
  confirm(`是否确定删除${rowData.menuName}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    message('删除成功', { type: 'success' })
  })
}

defineExpose({
  register
})
</script>
