<template>
  <el-button v-bind="attrs" v-if="show">
    <slot>
      <span>
        {{ label || '权限按钮' }}
      </span>
    </slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PermissionsType, usePermissions } from '@/hook/usePermissions'
import systemSettings from '@/config/system'

type ExportButtonProps = {
  label?: string
  permission: PermissionsType
}
const props = defineProps<ExportButtonProps>()
const emits = defineEmits(['confirm'])
const attrs = useAttrs()
const permissionsMap = systemSettings.permissionProps
const permission = computed(() => {
  return permissionsMap[props.permission]
})
const [permissionStatus] = usePermissions()
const show = computed(() => {
  return permissionStatus[permission.value]
})
</script>

<style scoped></style>
