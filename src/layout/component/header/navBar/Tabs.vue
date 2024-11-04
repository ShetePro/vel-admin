<template>
  <div
    class="layout-header-tabs pl-2 pb-2"
    :class="{
      'tabs-card': getSystemConfig.navsType === NavsTypeEnum.card,
      'bg-white': getSystemConfig.navsType === NavsTypeEnum.card,
      'dark:bg-gray-950': getSystemConfig.navsType === NavsTypeEnum.card
    }"
  >
    <Icon
      class="cursor-pointer pr-1"
      v-if="isScroll"
      icon="ep:arrow-left"
      size="22"
      @click="moveScroll('left')"
    />
    <div class="flex flex-row grow overflow-hidden" ref="scrollRef" v-resize="hasScroll">
      <div class="flex flex-row items-center relative" ref="tabsRef">
        <div
          class="layout-header-tabs-item flex-c"
          :ref="`navBar${index}`"
          v-for="(item, index) in getNavList"
          @contextmenu.prevent="openMenu($event, item, index)"
          :key="item.path"
          @click="handleClickTab(item)"
        >
          <div v-if="getSystemConfig.navsType === NavsTypeEnum.flat">
            <span class="mr-2">{{ item.name }}</span>
            <Icon
              v-if="getNavList.length > 1"
              class="close-icon transition mt-1 ml-1 rounded-full hover:scale-125 hover:bg-gray-500 hover:text-white"
              icon="ep:close"
              size="12"
              @click.stop="handleCloseTab(item)"
            />
          </div>
          <el-tag
            v-else
            class="tab-item-card"
            :class="{ 'tab-active': route.fullPath === item.path }"
            :closable="getNavList.length > 1"
            @close="handleCloseTab(item)"
            :disable-transitions="true"
            :effect="route.fullPath === item.path ? 'dark' : ''"
            :type="route.fullPath === item.path ? 'primary' : 'info'"
            >{{ item.name }}</el-tag
          >
        </div>
        <div
          v-if="getSystemConfig.navsType === NavsTypeEnum.flat"
          class="is-active bg-white dark:bg-gray-700"
          :style="activeStyle"
        ></div>
      </div>
    </div>
    <Icon
      class="cursor-pointer pl-1"
      v-if="isScroll"
      icon="ep:arrow-right"
      size="22"
      @click="moveScroll('right')"
    />
    <NavContext ref="navContext" :visible="showContext" @close="handleCloseTab" />
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, triggerRef, watch } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { mapKeyToArr, mapValueToArr } from "@/utils/transform";
import { useRoute, useRouter } from "vue-router";
import { NavContextMethods, TabsItemProps } from "@/layout/types";
import { Icon } from "@/components/Icon";
import NavContext from "@/layout/component/header/navBar/NavContext.vue";
import { useSettingStore } from "@/store/modules/settings";
import { NavsTypeEnum } from "@/enum/settingsEnum";

const route = useRoute();
const router = useRouter();
const scrollRef = ref<HTMLDivElement | null>(null);
const tabsRef = ref<HTMLDivElement | null>(null);
const navContext = ref<NavContextMethods>();
const { getNavBars, deleteNavBar } = useLayoutStore();
const getNavList = computed(() => {
  return mapValueToArr(getNavBars);
});
const instance = getCurrentInstance();
const activeStyle = ref({
  width: "100px",
  height: "100%",
  transform: `translateX(0px)`,
});
const isScroll = ref<boolean>(false);
const showContext = ref<boolean>(false);
const {getSystemConfig} = useSettingStore()
// navbar变化时，强制更新 active 样式
watch(getNavBars, () => {
  nextTick(() => {
    setActiveStyle();
    triggerRef(getNavList);
    // 判断是否需要滚动 解决滚动溢出问题
    hasScroll();
  });
});

watch(route, () => {
  setActiveStyle();
});

// 切换成扁平模式时 重新设置选中样式
watch(() => getSystemConfig.navsType, (val) => {
  if (val === NavsTypeEnum.flat) {
    setActiveStyle()
  }
})

function hasScroll() {
  // 可视区域长度
  const scrollDomWidth = scrollRef.value?.offsetWidth || 0;
  // tabs长度
  const tabsDomWidth = tabsRef.value?.offsetWidth || 0;
  isScroll.value = tabsDomWidth > scrollDomWidth;
}

// 移动滚动条
function moveScroll(mode: "left" | "right") {
  let left = mode === "left" ? -200 : 200;
  scrollRef.value?.scrollBy({
    left,
    behavior: "smooth",
  });
}
// 根据path获取tab元素
function getTabByPath(path: string) {
  const index = getNavList.value.findIndex((item) => item.path === path);
  const refs = instance?.refs[`navBar${index}`] as HTMLDivElement[];
  if (refs) {
    return refs[0];
  }
}
// 设置选中背景样式
const setActiveStyle = () => {
  nextTick(() => {
    const dom = getTabByPath(route.fullPath);
    if (dom) {
      activeStyle.value.width = `${dom.offsetWidth || 0}px`;
      activeStyle.value.transform = `translateX(${dom.offsetLeft || 0}px)`;
      const parentScroll: number | undefined = scrollRef.value?.scrollLeft;
      scrollRef.value?.scrollBy({
        left: dom.offsetLeft - (parentScroll || 0),
        behavior: "smooth",
      });
    }
  });
};



onMounted(() => {
  // 判断是否需要滚动 解决滚动溢出问题
  hasScroll();
  setActiveStyle();
});
function openMenu(e: Event, item: TabsItemProps, index: number) {
  const { offsetX, offsetY } = e as MouseEvent;
  const tab = getTabByPath(item.path);
  const offsetLeft = tab?.offsetLeft || 0;
  const scrollLeft = scrollRef.value?.scrollLeft || 0;
  navContext.value?.open({
    x: (offsetX + offsetLeft) - scrollLeft + 20,
    y: offsetY + 10,
    tab: item,
    index,
  });
}

// 跳转
function handleClickTab(item: TabsItemProps) {
  router.push(item.path);
}

// 关闭标签
function handleCloseTab(data: TabsItemProps) {
  // 删除当前标签
  deleteNavBar(data);
  if (data.path === route.fullPath) {
    // 跳转到上一个标签
    const keys = mapKeyToArr(getNavBars);
    let beforePath = "";
    keys.some((item) => {
      if (item === data.path) {
        return true;
      } else {
        beforePath = item;
      }
    });
    router.push(beforePath);
  }
}
</script>

<style lang="scss" scoped>
.tabs-card {
  margin-top: 0 !important;
  .layout-header-tabs-item {
    padding: 0;
  }
  .tab-active {
    font-weight: bold;
    color: var(--el-color-white);
  }
  .tab-item-card {
    padding: 15px;
    margin: 0 5px;
    font-size: 1rem;
  }
}
.layout-header-tabs {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  &-item {
    padding: 0 10px 0 20px;
    cursor: pointer;
    z-index: 1;
    user-select: none;
    white-space: nowrap;
    height: 40px;
    font-size: 1rem;
  }
  .is-active {
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
  }
}
</style>
