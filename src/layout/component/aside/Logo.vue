<template>
  <div
    class="layout-aside-logo flex flex-row items-center justify-items-start"
    :style="{ minHeight: config.headerHeight + 'px' }"
  >
    <div class="flex-ac" style="min-width: 64px">
      <img :width="props.iconSize" :src="systemSettings.logoUrl" alt="logo" />
    </div>
    <h3 class="whitespace-nowrap" v-show="showLabel" :style="{fontSize: props.fontSize + 'px'}">{{ config.projectName }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store/modules/settings";
import { toRef } from "vue";
import systemSettings from "../../../config/system";

const props = defineProps<{
  iconSize?: number
  fontSize?: number
  showLabel?: boolean
}>()
const settingStore = useSettingStore();
const config = toRef(settingStore, "systemConfig");
const expand = toRef(settingStore, "getMenuExpand");
</script>

<style lang="scss" scoped>
.layout-aside-logo {
  height: 60px;
  h3 {
    white-space: nowrap;
  }
}
</style>
