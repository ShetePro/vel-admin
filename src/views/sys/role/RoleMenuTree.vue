<template>
  <el-card
    class="flex flex-row flex-grow w-1/2 ml-3"
    body-style="width: 100%;display: flex;flex-direction: column"
  >
    <div class="w-full flex flex-row justify-end">
      <el-button v-if="permissionStatus.update" type="success" @click="handleSave">保存</el-button>
      <el-button type="info" @click="handleRefresh">刷新</el-button>
    </div>
    <el-tree
      class="flex flex-col w-full h-3/4 grow overflow-y-auto"
      ref="treeRef"
      :data="roleMenuData"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      default-expand-all
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMessage } from '@/hook/useMessage'
import { detailRoleApi, updateRoleMenuApi } from '@/api/sys/role'
import { usePermissions } from '@/hook/usePermissions'
import { menuData } from '@/data/menuData'
import { MenuDataItem } from '@/layout/component/aside/menuData'

const { message } = useMessage()
const roleMenuData = ref<MenuDataItem[]>([])
const treeRef = ref()
let roleId = ''
const selectIdList = ref<string[]>([])
const defaultProps = {
  children: 'children',
  label: 'menuName'
}

const [permissionStatus] = usePermissions()
onMounted(() => {
  roleMenuData.value = menuData
})
function getRoleSelect(id: string) {
  roleId = id
  treeRef.value.setCheckedKeys(selectIdList.value)
}

function handleSave() {
  message('保存成功', { type: 'success' })
}
function handleRefresh() {
  treeRef.value.setCheckedKeys(selectIdList.value)
}

defineExpose({
  getRoleSelect
})
</script>

<style scoped></style>
