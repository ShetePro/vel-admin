<template>
  <el-card class="dict-list flex flex-col h-full" body-class="h-0 flex flex-col flex-grow">
    <PermissionButton permission="create" class="w-full mb-2" type="primary" @click="handleCreate"
      >新增字典</PermissionButton
    >
    <div class="flex overflow-y-auto flex-grow w-full h-full">
      <div class="flex flex-col w-full">
        <div
          class="dict-list-item p-2 cursor-pointer"
          :class="{
            'select-dict': selectDict?.id === item.id
          }"
          @click="handleClick(item)"
          v-for="item in dictTypeData"
          :key="item.id"
        >
          <div class="flex flex-row justify-between">
            <span>{{ item.remarks }}</span>
            <div class="dict-menu">
              <el-tooltip
                v-if="permissionStatus.update"
                effect="dark"
                content="编辑"
                placement="top"
                :show-after="1000"
              >
                <Icon
                  class="pr-2 hover:text-blue-400"
                  icon="carbon:edit"
                  @click.stop="handleUpdate(item)"
                />
              </el-tooltip>
              <el-tooltip
                v-if="permissionStatus.delete"
                effect="dark"
                content="删除"
                placement="top"
                :show-after="1000"
              >
                <Icon
                  class="hover:text-rose-500"
                  icon="material-symbols:delete-outline"
                  @click.stop="handleDelete(item)"
                />
              </el-tooltip>
            </div>
          </div>
          <div
            class="text-xs mt-1 text-ellipsis overflow-hidden w-full whitespace-nowrap"
            style="color: #909399"
            v-if="item.description"
          >
            描述：{{ item.description || '-' }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
  <DictTypeDialog ref="dictTypeDialog" @reload="getData" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMessage } from '@/hook/useMessage'
import { usePermissions } from '@/hook/usePermissions'
import { Icon } from '@iconify/vue'
import { deleteDictTypeApi, getDictTypePageApi } from '@/api/sys/dict'
import DictTypeDialog from '@/views/sys/dict/DictTypeDialog.vue'
import { DictItem } from '@/types/dict'
import PermissionButton from '@/components/Button/PermissionButton.vue'

const { message, confirm } = useMessage()
const dictTypeData = ref<DictItem[]>([])
const dictTypeDialog = ref()
const selectDict = ref<DictItem>()
const [permissionStatus] = usePermissions()
const emits = defineEmits(['change'])
onMounted(() => {
  getData()
})

function getData() {
  getDictTypePageApi().then(({ data }) => {
    dictTypeData.value = [{ remarks: '全部字典', type: '' }, ...data.rows]
  })
}

function handleClick(dict: DictItem) {
  selectDict.value = dict
  emits('change', selectDict.value)
}
function handleCreate() {
  dictTypeDialog.value?.open({}, 'create')
}

function handleDelete(item: DictItem) {
  confirm(`是否确定删除${item.remarks}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteDictTypeApi(item.id).then(() => {
      message('删除成功', { type: 'success' })
      getData()
    })
  })
}

function handleUpdate(dict: DictItem) {
  dictTypeDialog.value?.open(dict, 'update')
}
</script>

<style scoped>
.dict-list {
  width: 15rem;
  min-width: 15rem;
}
.select-dict {
  background: var(--el-color-primary-light-9);
  border-radius: 5px;
  color: var(--el-color-primary);
  font-weight: bold;
}
</style>
