<template>
  <div class="view flex flex-col">
    <SearchForm v-model="searchData" :option="searchOption" @reset="resetPagination"></SearchForm>
    <BasicTable :register="register">
      <template #title>
        <div class="flex flex-row justify-between">
          <div class="text-2xl flex-ac">
            <img :src="tableIconUrl" width="40" alt="table" />
            <span class="ml-2">用户列表</span>
          </div>
          <PermissionButton
            permission="create"
            class="mb-2"
            type="primary"
            @click="handleCreate"
            >新增</PermissionButton
          >
        </div>
      </template>
      <template #menu="{ row }">
        <div class="flex-ac">
          <IconButton
            permission="update"
            icon="material-symbols:edit-note"
            label="编辑"
            @action="handleUpdate(row)"
          ></IconButton>
          <IconButton
            icon="fluent:apps-list-detail-24-regular"
            type="info"
            label="详情"
            @action="handleDetail(row)"
          ></IconButton>
          <IconButton
            permission="delete"
            icon="material-symbols:delete-outline"
            type="danger"
            label="删除"
            @action="handleDelete(row)"
          ></IconButton>
        </div>
      </template>
      <template #roleType="{ row }">
        <el-tag v-for="item in getRoleList(row)" :key="item">
          {{ roleMap[item] || '未知' }}
        </el-tag>
      </template>
    </BasicTable>
    <MainDialog ref="mainDialog"></MainDialog>
  </div>
</template>

<script setup lang="ts">
import BasicTable from '@/components/Table'
import { useTable } from '@/hook/useTable'
import IconButton from '@/components/IconButton/index.vue'
import MainDialog from './MainDialog.vue'
import { computed, ref } from 'vue'
import { useMessage } from '@/hook/useMessage'
import { searchOption, tableOption } from './option'
import SearchForm from '@/components/Form/src/SearchForm.vue'
import { useUserStore } from '@/store/modules/user'
import { usePermissions } from '@/hook/usePermissions'
import { tableIconUrl } from '@/config/global'
import PermissionButton from '@/components/Button/PermissionButton.vue'
const { message, confirm } = useMessage()
const mainDialog = ref()
const userStore = useUserStore()
const { register, searchData, resetPagination, setData } = useTable({
  options: tableOption
})
setData([
  {
    userName: 'admin',
    name: '管理员',
    roleIds: ['1'],
    post: '管理',
    email: 'sheteprolin@gmail.com'
  }
])
const [permissionStatus] = usePermissions()
const roleMap = computed(() => {
  const map: { [key: string]: string } = {}
  userStore.roleTypeList.forEach((item) => {
    map[item.id] = item.roleName
  })
  return map
})
const getRoleList = computed(() => {
  return (row: Recordable) => {
    return Array.isArray(row.roleList) ? row.roleList : []
  }
})
function handleCreate() {
  mainDialog.value?.open(
    {
      roleList: []
    },
    'create'
  )
}
function handleUpdate(rowData: Recordable) {
  mainDialog.value?.open(rowData, 'update')
}
function handleDetail(rowData: Recordable) {
  mainDialog.value?.open(rowData, 'detail')
}
function handleDelete(rowData: Recordable) {
  confirm(`是否确定删除${rowData.name}?`, '提示', {
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
