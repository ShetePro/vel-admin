<template>
  <div class="aside-user-box flex flex-row items-center mt-5 mb-5 ml-2 text-white">
    <component :is="setting.getMenuExpand ? 'div' : 'el-tooltip'" placement="right" :offset="20">
      <template #content>
        <div class="flex-c">
          <h3>{{userInfo.name}}</h3>
          <div class="text-center ml-2">{{userInfo.userName}}</div>
        </div>
<!--        <el-button type="text" @click="changePassword">修改密码</el-button>-->
        <el-button type="text" @click="useStore.logOut">退出</el-button>
      </template>
      <el-avatar class="cursor-pointer" :src="userInfo.avatar || defaultAvatar" :size="45"></el-avatar>
    </component>
    <div class="ml-4" style="height: 45px" v-if="setting.getMenuExpand">
      <div class="whitespace-nowrap">{{userInfo.name}}</div>
      <div class="whitespace-nowrap">
<!--        <el-button type="text" @click="changePassword">修改密码</el-button>-->
        <el-button type="text" @click="useStore.logOut">退出</el-button>
      </div>
    </div>
<!--    <PasswordDialog ref="passwordDialog" />-->
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useSettingStore } from "@/store/modules/settings";
import { computed, ref } from "vue";
import defaultAvatar from '@/assets/image/default-avatar.jpg'
import { UserInfoProp } from "@/store/types";
// import PasswordDialog from "@/views/sys/user/PasswordDialog.vue";

const useStore = useUserStore()
const passwordDialog = ref()
const userInfo = computed<Partial<UserInfoProp>>(() => {
  return useStore.userInfo
})
const setting = useSettingStore()
function changePassword() {
  passwordDialog.value.open()
}
</script>

<style scoped>

</style>
