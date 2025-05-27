<template>
  <div class="view flex flex-col">
    <div class="p-4 bg-white rounded-md mb-5">
      <el-form-item label="token">
        <el-input v-model="formData.token" placeholder="请输入token"></el-input>
      </el-form-item>
      <el-form-item label="appKey">
        <el-input
          class=""
          v-model="formData.appKey"
          placeholder="请输入appKey"
          :maxlength="3000"
        ></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="getList">获取用户信息</el-button>
        <el-button type="success" @click="handleUpdate">更新用户appKey</el-button>
      </div>
    </div>
    <BasicTable :register="register"> </BasicTable>
    <el-dialog
      v-model="dialogVisible"
      title="更新用户AppKey"
      width="500"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div>
        <el-progress
          :percentage="(userFinishCount / updateUserList.length) * 100"
          :stroke-width="15"
          :format="() => `${userFinishCount}/${updateUserList.length}`"
          :striped="userFinishCount < updateUserList.length - 1"
          :color="customColors"
          striped-flow
          :duration="10"
        />
        <div class="flex flex-col w-full" v-if="updateUserList">
          <div
            class="flex flex-row items-center justify-start w-full p-2"
            v-for="item in updateUserList"
            :key="item.id"
          >
            <span class="flex flex-col justify-center mr-2">
              <Icon v-if="item.isFinish" icon="line-md:check-all" class="text-green-600" />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            </span>
            <span class="min-w-11">{{ item.name }}</span>
            <span
              class="ml-4 text-ellipsis whitespace-nowrap overflow-hidden"
              :title="item.appKey"
              >{{ item.appKey }}</span
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import BasicTable from '@/components/Table'
import { useTable } from '@/hook/useTable'
import { computed, ref, watch } from 'vue'
import { useMessage } from '@/hook/useMessage'
import { tableOption } from './option'
import { request } from '@/utils/http'
import { Icon } from '@/components/Icon'

type UserType = {
  username: string
  id: string
  name: string
  appKey: string
  mobile?: string
  updateDate?: string
  isFinish?: boolean
}
const formData = ref({
  token: '',
  appKey: ''
})
const customColors = [
  { color: '#e6a23c', percentage: 0 },
  { color: '#67c23a', percentage: 100 }
]
const dialogVisible = ref<boolean>(false)
const { message, confirm } = useMessage()
const updateUserList = ref<UserType[]>([])
const userFinishCount = computed(() => {
  return updateUserList.value.filter((item) => item.isFinish)?.length
})
watch(
  () => userFinishCount.value,
  (value) => {
    if (value >= updateUserList.value.length) {
      getList()
      dialogVisible.value = false
    }
  }
)
const { register, getList, getData } = useTable<UserType>({
  options: tableOption,
  page: {
    pageSize: 30,
  },
  api: '/rest/sys/user/getPage',
  apiConfig: () => {
    return {
      headers: {
        Authorization: formData.value.token
      }
    }
  },
  apiHandler(res) {
    return res.data
  },
  apiOptions: {
    apiUrl: '/ghzx'
  }
})
function updateAppKey(item: UserType) {
  // const randomNumber = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     item.isFinish = true
  //     item.appKey =
  //       new Date().getTime() +
  //       'asodifuqwejnfoasijcvoqwenfoqwjefioeqjfqklwnflkaskfjasldfjdasjfqwelkf'
  //   }, randomNumber)
  // })
  request
    .request(
      {
        method: 'POST',
        url: '/rest/sys/user/update',
        headers: {
          Authorization: formData.value.token
        },
        data: {
          id: item.id,
          userName: item.username,
          source: 1,
          appKey: formData.value.appKey
        }
      },
      {
        apiUrl: '/ghzx'
      }
    )
    .then(() => {
      item.isFinish = true
      item.appKey = formData.value.appKey
    })
    .catch(() => {
      message(`用户${item.name}:${item.username}更新appKey失败`, {
        type: 'error'
      })
    })
}

function handleUpdate() {
  if (!formData.value.appKey) {
    message('请输入appKey', {
      type: 'error'
    })
    return
  }
  updateUserList.value = getData().map((item) => {
    return {
      id: item.id,
      isFinish: false,
      name: item.name,
      username: item.username,
      appKey: item.appKey
    }
  })
  dialogVisible.value = true
  updateUserList.value?.forEach((item: any) => {
    updateAppKey(item)
  })
}
defineExpose({
  register
})
</script>
