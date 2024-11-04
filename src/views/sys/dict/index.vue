<template>
  <div class="view flex flex-row">
    <DictTypeTree @change="changeType" />
    <div class="flex flex-col ml-4 flex-grow flex-shrink min-w-0">
      <SearchForm
        v-model="searchData"
        :option="searchOption"
        @search="getList"
        @reset="resetPagination"
        :ignore="['type']"
      ></SearchForm>
      <BasicTable :register="register">
        <template #title>
          <div class="flex flex-row justify-between">
            <div class="text-2xl flex-ac">
              <img :src="tableIconUrl" width="40" alt="table" />
              <span class="ml-2">{{ tableName }}</span>
            </div>
            <PermissionButton permission="create" class="mr-5" type="primary" @click="handleCreate"
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
      </BasicTable>
    </div>
    <DictDataDialog ref="mainDialog" @reload="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '@/components/IconButton/index.vue'
import BasicTable from '@/components/Table'
import { usePermissions } from '@/hook/usePermissions'
import { useTable } from '@/hook/useTable'
import { tableOption } from './option'
import { useMessage } from '@/hook/useMessage'
import DictTypeTree from '@/views/sys/dict/DictTypeTree.vue'
import { searchOption } from './option'
import SearchForm from '@/components/Form/src/SearchForm.vue'
import DictDataDialog from '@/views/sys/dict/DictDataDialog.vue'
import { deleteDictDataApi, getDictDataPageByType } from '@/api/sys/dict'
import { DictItem } from '@/types/dict'
import { tableIconUrl } from '@/config/global'
import PermissionButton from '@/components/Button/PermissionButton.vue'
const { register, searchData, getList, resetPagination, setData, setLoading } = useTable({
  api: '/rest/sys/dictEntry/getPage',
  options: tableOption
})
const [permissionStatus] = usePermissions()
const mainDialog = ref()
const { message, confirm } = useMessage()
const tableName = ref<string>('字典数据表')
function handleCreate() {
  mainDialog.value?.open(
    {
      dictId: searchData.value?.dictId,
      type: searchData.value?.type
    },
    'create'
  )
}
function handleUpdate(rowData: Recordable) {
  mainDialog.value?.open({ ...rowData }, 'update')
}
function handleDetail(rowData: Recordable) {
  mainDialog.value?.open({ ...rowData }, 'detail')
}
function handleDelete(rowData: Recordable) {
  confirm(`是否确定删除${rowData.remarks}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteDictDataApi(rowData.id).then(() => {
      getList()
      message('删除成功', { type: 'success' })
    })
  })
}
function changeType(data: DictItem) {
  tableName.value = data.remarks || '字典数据表'
  searchData.value.type = data.type
  searchData.value.dictId = data.id
  if (data.type) {
    setLoading(true)
    getDictDataPageByType(data.type)
      .then(({ data }) => {
        setData(data)
      })
      .finally(() => {
        setLoading(false)
      })
  } else {
    getList()
  }
}
</script>

<style scoped></style>
