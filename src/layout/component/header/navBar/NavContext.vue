<template>
  <!-- 右键菜单按钮 -->
  <transition name="el-zoom-in-top">
    <ul
      v-show="visible"
      :key="Math.random()"
      :style="getContextMenuStyle"
      class="contextmenu"
    >
      <div
        v-for="(item, key) in tagsViews.filter((item) => item.show)"
        :key="key"
        :class="[item.disabled ? 'contextmenu-disabled' : 'contextmenu-item']"
        style="display: flex; align-items: center"
      >
        <li v-if="item.show" @click="selectTag(key, item)">
          <Icon :icon="item.icon" />
          <span class="ml-1">{{ item.text }}</span>
        </li>
      </div>
    </ul>
  </transition>
</template>

<script setup lang="ts">
import { Icon } from "@/components/Icon";
import { computed, CSSProperties, ref, unref } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { useEventListener } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { NavContextOpenProps, TabsItemProps } from "@/layout/types";
type NavContextItem = {
  icon: string;
  text: string;
  disabled: boolean;
  show: boolean;
};
const visible = ref<boolean>(false);
const { getNavBars, closeOtherNavBar, closeLeftNavBar, closeRightNavBar } =
  useLayoutStore();
const route = useRoute();
const router = useRouter();
const top = ref<number>(0);
const left = ref<number>(0);
const openTab = ref<TabsItemProps>();
const index = ref<number>(0);
const emits = defineEmits(["close"]);
const tagsViews = computed<Array<NavContextItem>>(() => {
  return [
    {
      icon: "ep:refresh-right",
      text: "重新加载",
      disabled: false,
      show: true,
    },
    {
      icon: "ep:close",
      text: "关闭标签页",
      disabled: getNavBars.size <= 1,
      show: true,
    },
    {
      icon: "ep:caret-left",
      text: "关闭左侧标签页",
      disabled: getNavBars.size <= 1 || index.value === 0,
      show: true,
    },
    {
      icon: "ep:caret-right",
      text: "关闭右侧标签页",
      disabled: getNavBars.size <= 1 || index.value === getNavBars.size - 1,
      show: true,
    },
    {
      icon: "ep:remove",
      text: "关闭其他标签页",
      disabled: getNavBars.size < 2,
      show: true,
    },
  ];
});
function open(data: NavContextOpenProps) {
  const { x, y, tab } = data;
  left.value = x;
  top.value = y;
  openTab.value = tab;
  index.value = data.index;
  visible.value = true;
  useEventListener(document, "click", () => {
    close();
  });
}
function close() {
  visible.value = false;
}
/** 刷新路由 */
function onFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query: query,
  });
}
// 关闭右键选中标签页
function closeCurrentTag() {
  emits("close", { path: openTab.value?.path });
}
// 关闭其他标签页
function closeOther() {
  if (openTab.value) {
    closeOtherNavBar(openTab.value);
    openTab.value.path !== route.fullPath && router.push(openTab.value.path);
  }
}
function selectTag(key: number, item: NavContextItem) {
  if (item.disabled) return;
  switch (key) {
    case 0:
      onFresh();
      break;
    case 1:
      closeCurrentTag();
      break;
    case 2:
      openTab.value && closeLeftNavBar(openTab.value);
      break;
    case 3:
      openTab.value && closeRightNavBar(openTab.value);
      break;
    case 4:
      closeOther();
      break;
  }
}
const getContextMenuStyle = computed((): CSSProperties => {
  return { left: left.value + "px", top: top.value + "px" };
});
defineExpose({
  open,
  close,
  getContextMenuStyle,
  selectTag,
  tagsViews,
});
</script>

<style lang="scss" scoped>
/* 右键菜单 */
.contextmenu {
  margin: 0;
  background: var(--el-bg-color);
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  color: var(--el-text-color-primary);
  font-weight: normal;
  font-size: 13px;
  white-space: nowrap;
  outline: 0;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  z-index: 10;
  &-item {
    cursor: pointer;
    &:hover {
      // background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
  &-disabled {
    color: #999999;
    cursor: not-allowed;
  }
  li {
    width: 100%;
    margin: 0;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    svg {
      display: block;
      margin-right: 0.5em;
    }
  }
}
</style>
