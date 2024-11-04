<template>
  <div class="relative" :class="{ 'is-dark': !colorMode }">
    <el-switch
      v-model="colorMode"
      class="mt-2"
      size="large"
      inline-prompt
      @change="changeColorMode"
      :active-icon="lightIcon"
      :inactive-icon="darkIcon"
    />
    <span class="action-box"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue'
import { useSettingStore } from '@/store/modules/settings'
import lightIcon from '@/assets/image/common/light_icon.svg?component'
import darkIcon from '@/assets/image/common/dark_icon.svg?component'

const settingStore = useSettingStore()
const settings = toRef(settingStore, 'getSystemConfig')
const colorMode = ref<boolean>(!settings.value.colorMode)
const html = document.getElementsByTagName('html')[0]
onMounted(() => {
  if (colorMode.value) {
    html.classList.remove('dark')
  }else {
    html.classList.add('dark')
  }
})
function changeColorMode(val: boolean) {
  settingStore.setSetting({ colorMode: !val })
  html.classList.toggle('dark')
}
</script>

<style lang="scss" scoped>
:deep .el-switch {
  --el-switch-off-color: #2c2c2c;
  --el-switch-on-color: #f2f2f2;
  .el-icon {
    color: var(--el-color-white) !important;
  }
  .el-switch__core .el-switch__inner {
    z-index: 10;
    padding: 0 0 0 calc(20px + 2px);
  }
}
:deep .el-switch.is-checked {
  .el-icon {
    color: var(--el-color-black) !important;
  }
  .el-switch__core {
    border: 1px solid var(--border-color);
  }
  .el-switch__core .el-switch__inner {
    padding: 0 calc(20px + 2px) 0 0;
  }
}

.action-box {
  width: 20px;
  height: 20px;
  top: 18px;
  left: 4px;
  border-radius: 50%;
  position: absolute;
  background-color: var(--el-color-white);
  transition:
    border-color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    transform var(--el-transition-duration);
}
.is-dark {
  .action-box {
    transform: translate(25px);
    top: 18px;
    left: 1px;
    background-color: var(--el-color-black);
  }
}

:deep .el-switch__action {
  display: none;
  opacity: 0;
}
</style>
