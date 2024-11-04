<template>
  <Layout v-resize="layoutResize" :class="[settings.getSystemConfig.layoutMode]">
    <template #aside>
      <ASide />
    </template>
    <template #header>
      <Header />
    </template>
    <template #body>
      <router-view v-if="hasShowView">
        <template #default="{ Component, route }">
          <transition v-if="settings.getSystemConfig.transition" name="fade" mode="out-in" appear>
            <KeepAlive :include="getKeepAliveList">
              <component :is="Component" />
            </KeepAlive>
          </transition>
          <KeepAlive v-else :include="getKeepAliveList">
            <component :is="Component" />
          </KeepAlive>
        </template>
      </router-view>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import ASide from '@/layout/component/aside/ASide.vue'
import Header from '@/layout/component/header/Header.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { computed, onMounted, ref } from 'vue'
import { useSettingStore } from '@/store/modules/settings'

const settings = useSettingStore()
const layoutStore = useLayoutStore()
const hasShowView = ref<boolean>(false)
// const { getUserInfo, getRoleTypes } = useUserStore()
onMounted(() => {
  // 获取角色和用户信息后展示view
  Promise.all([
    // 获取用户信息
    // getUserInfo(),
    // 角色列表
    // getRoleTypes(),
  ]).finally(() => {
    hasShowView.value = true
  })
})
// 获取 keepAlive include数据
const getKeepAliveList = computed(() => {
  return layoutStore.getCachePages
})
function layoutResize(el: HTMLDivElement) {
  const { offsetWidth, offsetHeight } = el
  if (offsetWidth < 600 && offsetWidth !== 0) {
    settings.menuExpand = false
  }
  layoutStore.layoutWidth = offsetWidth
  layoutStore.layoutHeight = offsetHeight
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
