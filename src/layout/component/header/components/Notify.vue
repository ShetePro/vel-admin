<template>
  <div :class="prefixCls" v-loading="tableLoading">
    <el-popover
      placement="bottom"
      trigger="click"
      width="20rem"
      :popper-class="`${prefixCls}-popover`"
    >
      <div :class="`${prefixCls}-header`">
        <div :class="`${prefixCls}-header-tabs`">
          <span
            :class="`${prefixCls}-header-tabs-tab rounded-2xl ${
              componentsName === item.name ? prefixCls + '-header-tabs-active' : ''
            }`"
            v-for="item in tabList"
            :key="item.name"
            @click="changeTag(item)"
            >{{ item.label }}</span
          >
        </div>
        <el-button type="text">查看全部</el-button>
      </div>
      <transition name="component-fade" mode="out-in">
        <SystemList />
      </transition>
      <template #reference>
        <div
          :class="`${prefixCls}-button flex-ac cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`"
          style="border: none"
        >
          <el-badge :value="1" :max="100" :hidden="false">
            <Icon icon="ep:bell" size="26" />
          </el-badge>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SystemList from './SystemList.vue'
import { Icon } from '@/components/Icon'
const prefixCls = 'aochen-notify'
const tabList = [
  { label: '系统消息', name: 'SystemList' }
  // { label: '代办消息', name: 'waitList' }
]
const componentsName = ref('SystemList')
const tableLoading = ref(false)
const changeTag = (item: any) => {
  componentsName.value = item.name
}
</script>

<style lang="scss" scoped>
.aochen-notify {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  &-popover {
    padding: 1px !important;
  }
  &-button {
    width: 100%;
    height: 100%;
    padding: 1px 20px;
  }
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    &-tabs {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-tab {
        background: #f3f3f4;
        padding: 6px 10px;
        margin: 0 5px;
        cursor: pointer;
        white-space: nowrap;
      }
      &-active {
        color: #fff;
        background: var(--primary-color) !important;
      }
    }
  }

  span {
    height: 100%;
  }
  :deep .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.4s ease;
  }
  :deep .component-fade-enter,
  .component-fade-leave-to {
    opacity: 1;
  }
}

</style>
