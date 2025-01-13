<template>
  <div
    @click="openSetting"
    class="layout-header-setting rounded-md cursor-pointer flex-ac pl-2 pr-2 transition-colors"
  >
    <Icon icon="ep:setting" size="22" />
    <el-drawer v-model="showSetting" size="400px" title="全局设置" direction="rtl">
      <div class="flex flex-col h-full justify-start">
        <div class="flex flex-col justify-start items-center flex-grow">
          <el-divider> 主题 </el-divider>
          <DarkSwitch />
          <el-divider>布局模式</el-divider>
          <div class="flex flex-row w-full items-center p-5 justify-between">
            <TwoMenuMode />
            <SingleMenuMode />
            <TopMenuMode />
            <TopLeftMenuMode />
          </div>
          <!--          <el-radio-group v-model="getSystemConfig.layoutMode">-->
          <!--            <el-radio :label="LayoutModeTypeEnum.classical" size="large" border>经典</el-radio>-->
          <!--            <el-radio :label="LayoutModeTypeEnum.top" size="large" border>置顶</el-radio>-->
          <!--          </el-radio-group>-->
          <el-divider>界面显示</el-divider>
          <ul class="view-settings text-zinc-950">
            <li>
              <span class="dark:text-white">主题颜色</span>
              <color-select
                v-model="getSystemConfig.primaryColor"
                inline-prompt
                @change="colorChange"
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">灰色模式</span>
              <el-switch
                v-model="getSystemConfig.grayMode"
                inline-prompt
                @change="greyChange"
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">色弱模式</span>
              <el-switch
                v-model="getSystemConfig.weaknessMode"
                inline-prompt
                @change="weaknessChange"
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">路由过渡动画</span>
              <el-switch
                v-model="getSystemConfig.transition"
                @change="setSetting"
                inline-prompt
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">标签栏</span>
              <el-switch
                v-model="getSystemConfig.showNavs"
                @change="setSetting"
                inline-prompt
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">标签栏模式</span>
              <el-radio-group v-model="getSystemConfig.navsType" @change="() => setSetting()">
                <el-radio-button :label="NavsTypeEnum.flat" name="扁平">扁平</el-radio-button>
                <el-radio-button :label="NavsTypeEnum.card" name="卡片">卡片</el-radio-button>
              </el-radio-group>
            </li>
            <li>
              <span class="dark:text-white">菜单宽度</span>
              <el-input-number
                v-model="getSystemConfig.menuWidth"
                :min="200"
                :max="500"
                :step="10"
                controls-position="right"
                style="width: 120px"
                @change="setSetting"
              />
            </li>
          </ul>
        </div>
        <div>
          <el-button type="warning" class="w-full" @click="resetStorage"
            >清空所有缓存并退出</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon'
import DarkSwitch from '@/components/DarkSwitch/index.vue'
import { onMounted, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useSettingStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'
import { useSetting } from '@/hook/useSetting'
import { NavsTypeEnum } from '@/enum/settingsEnum'
import { useUserStore } from '@/store/modules/user'
import TwoMenuMode from '@/layout/component/header/components/TwoMenuMode.vue'
import TopMenuMode from '@/layout/component/header/components/TopMenuMode.vue'
import SingleMenuMode from '@/layout/component/header/components/SingleMenuMode.vue'
import TopLeftMenuMode from '@/layout/component/header/components/TopLeftMenuMode.vue'
import ColorSelect from '@/components/Select/ColorSelect.vue'
const settings = useSettingStore()
const { greyChange, weaknessChange, colorChange } = useSetting()
const userStore = useUserStore()
const { getSystemConfig } = storeToRefs(settings)
const { setSetting } = settings

const showSetting = ref<boolean>(false)
const isDark = useDark()
const toggleColor = useToggle(isDark)
onMounted(() => {
  // 初始化颜色模式
  toggleColor(settings.getSystemConfig.colorMode)
  // 初始化灰色模式
  greyChange(settings.getSystemConfig.grayMode)
  // 初始化色弱模式
  weaknessChange(settings.getSystemConfig.weaknessMode)
  // 初始化主题色
  colorChange(settings.getSystemConfig.primaryColor)
})
function resetStorage() {
  localStorage.clear()
  sessionStorage.clear()
  userStore.logOut()
}
function openSetting() {
  showSetting.value = true
}
</script>

<style lang="scss" scoped>
.view-settings {
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px;
  }
}
.layout-header-setting {
  padding: 10px;
  background-color: transparent;
  &:hover {
    background-color: var(--primary-color);
    color: #fff;
  }
}
:deep .layout-mode-active {
  border-color: var(--primary-color) !important;
  border-width: 2px;
  box-shadow: 0 0 8px var(--primary-color);
}
</style>
