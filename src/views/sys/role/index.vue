<template>
  <div class="view flex flex-row">
    <el-card class="role-list flex flex-col">
      <PermissionButton permission="create" class="w-full mb-2" type="primary" @click="handleCreate"
        >新增角色</PermissionButton
      >
      <div class="flex flex-col flex-grow h-full">
        <div
          class="role-list-item p-2 cursor-pointer"
          :class="{
            'select-role': selectRole === item.id
          }"
          @click="clickRole(item)"
          v-for="item in roleList"
          :key="item.id"
        >
          <div class="flex flex-row justify-between">
            <span>{{ item.roleName }}</span>
            <div class="role-menu">
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
            v-if="item.remark"
          >
            描述：{{ item.remark || '-' }}
          </div>
        </div>
      </div>
    </el-card>
    <RoleMenuTree ref="roleMenuTreeRef" />
    <RoleAddDialog ref="roleAddDialog" @reload="getRoleList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { RoleProp } from '@/views/sys/role/types'
import { useMessage } from '@/hook/useMessage'
import RoleAddDialog from '@/views/sys/role/RoleAddDialog.vue'
import RoleMenuTree from '@/views/sys/role/RoleMenuTree.vue'
import { usePermissions } from '@/hook/usePermissions'
import PermissionButton from '@/components/Button/PermissionButton.vue'
import { roleData } from "@/data/roleData";
const { message, confirm } = useMessage()
const selectRole = ref<string>('')
const roleMenuTreeRef = ref()
const roleAddDialog = ref<MainDialogBaseFn | null>(null)

const [permissionStatus] = usePermissions()
const roleList = ref<RoleProp[]>([])
onMounted(() => {
  getRoleList()
})

function getRoleList() {
  roleList.value = roleData
  if (roleList.value.length > 0) {
    clickRole(roleList.value[0])
  }
}
function clickRole(role: RoleProp) {
  if (role && selectRole.value !== role.id) {
    selectRole.value = role.id
    roleMenuTreeRef.value.getRoleSelect(role.id)
  }
}
function handleCreate() {
  roleAddDialog.value?.open({}, 'create')
}

function handleDelete(role: RoleProp) {
  confirm(`是否确定删除${role.roleName}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    message('删除成功', { type: 'success' })
  })
}

function handleUpdate(role: RoleProp) {
  roleAddDialog.value?.open(role, 'update')
}
</script>

<style lang="scss" scoped>
.role-list {
  width: 15rem;
}
.select-role {
  background: var(--el-color-primary-light-9);
  border-radius: 5px;
  color: var(--el-color-primary);
  font-weight: bold;
}
</style>
