<template>
  <el-sub-menu v-if="hasSubMenu" :index="menu.id.toString()" popper-class="menu-popup-class">
    <template #title>
      <el-icon v-if="menu.icon">
        <Icon class="z-10" :icon="menu.icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <MenuItem
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
    ></MenuItem>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <el-icon v-if="menu.icon">
      <Icon class="z-10" :icon="menu.icon" />
    </el-icon>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@/components/Icon";
import { isEmpty } from "@/utils/is";
import { useSettingStore } from "@/store/modules/settings";
const props = defineProps<{
  menu: Recordable;
}>();
const { getSystemConfig } = useSettingStore();
const { menuProps } = getSystemConfig;
// 兼容不同接口格式
const menu = {
  name: props.menu[menuProps.name],
  icon: props.menu[menuProps.icon],
  path: props.menu[menuProps.path],
  children: props.menu[menuProps.children],
  meta: props.menu[menuProps.meta],
  id: props.menu.id
};
// 判断是否有子菜单
const hasSubMenu = computed(() => {
  return !isEmpty(menu.children);
});
</script>
<style lang="scss" scoped>

</style>
