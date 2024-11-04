import { buttonPermissions } from '@/utils/permission'
import { useRoute } from 'vue-router'
import systemSettings from '@/config/system'

export type PermissionsType = 'create' | 'update' | 'delete' | 'view' | 'audit'
// 按钮权限hook
export function usePermissions() {
  const path = useRoute().path
  const modeList: string[] = Object.values(systemSettings.permissionProps);
  const permissionStatus: KeyRecordable<boolean> = {}
  modeList.forEach((mode) => {
    permissionStatus[mode] = buttonPermissions({
      url: path,
      mode
    }) || true
  })

  return [permissionStatus]
}
