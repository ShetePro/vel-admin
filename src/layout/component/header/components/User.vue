<template>
  <el-dropdown class="layout-header-user" trigger="hover">
    <div
      class="pl-2 pr-2 flex flex-row items-center h-full cursor-pointer"
    >
      <el-avatar :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" :size="30" />
      <span class="ml-2">{{userInfo.userName}}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">
          <Icon class="mr-2" icon="material-symbols:exit-to-app" />
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { toRef } from "vue";
const userInfo = toRef(useUserStore(), 'userInfo')
function logOut() {
  useUserStore().logOut()
}
</script>

<style lang="scss" scoped>
.layout-header-user {
  font-size: 14px;
  transition: all 0.3s;
  padding: 10px;
  user-select: none;
  color: inherit;
  &, :focus-visible {
    outline: none;
  }
}
</style>
