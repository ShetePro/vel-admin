<template>
  <section class="layout flex flex-row">
    <aside class="layout-aside">
      <slot name="aside"></slot>
    </aside>
    <section
      class="layout-section flex flex-col basis-0 w-auto shrink flex-grow min-w-0"
    >
      <header class="layout-header">
        <slot name="header"></slot>
      </header>
      <main class="layout-section-body overflow-hidden grow p-2 rounded-tl-lg">
        <slot name="body"></slot>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings'
import { computed } from 'vue'
import { LayoutModeTypeEnum } from '@/enum/settingsEnum'
const settingStore = useSettingStore()
const asideWidth = computed(() => {
  return settingStore.getMenuExpand ? settingStore.getSystemConfig.menuWidth + 'px' : '4rem'
})
const getAsideStyle = computed(() => {
  return settingStore.getSystemConfig.layoutMode === LayoutModeTypeEnum.twoMenu
    ? {
      width: `${asideWidth.value}`,
      minWidth: `${asideWidth.value}`
    }
    : {
      width: `${asideWidth.value}`,
      minWidth: `${asideWidth.value}`
    }
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-color);
  &-aside {
    transition: all 0.5s ease;
  }
}
</style>
