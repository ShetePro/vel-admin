<template>
  <el-button v-bind="attrs" @click="importTable" :loading="importLoading">
    <template #icon v-if="icon">
      <Icon :icon="icon" />
    </template>
    <span>
      {{ importLoading ? '导入中' : label || '导入' }}
    </span>
  </el-button>
</template>

<script setup lang="ts">
import { openFileSelect } from '@/utils/file'
import { ref, useAttrs } from 'vue'
import { useMessage } from '@/hook/useMessage'
import { request } from '@/utils/http'
import Icon from '@/components/Icon/src/Icon.vue'
import { downloadByBlob } from "@/utils/file";

type ImportButtonProps = {
  api: string
  label?: string
  icon?: string
  requestData?: Recordable
  requestQuery?: Recordable
  isDownload?: Boolean
}
const props = defineProps<ImportButtonProps>()
const emits = defineEmits(['confirm'])
const attrs = useAttrs()
const importLoading = ref(false)
const { message } = useMessage()

// 导入
function importApi(data: FormData) {
  return request.post({
    url: props.api,
    data,
  },
  )
}
// 导入并下载
function importApi2(data: FormData) {
  return request.post({
    url: props.api,
    data,
    responseType: 'blob',
  },
  {
    isTransformRequestResult: false
  })
}
function importTable() {
  openFileSelect({accept: '.xls, .xlsx'}).then((data) => {
    if (props.api) {
      const formData = new FormData()
      data && formData.append('file', data[0])
      importLoading.value = true
      if(!props.isDownload){
        importApi(formData)
          .then(() => {
            message('导入成功', { type: 'success' })
            emits('confirm')
          })

          .finally(() => {
            importLoading.value = false
          })
      }else{
        importApi2(formData)
          .then((data) => {
            downloadByBlob(data, '出差表.xlsx')
            message('导入成功', { type: 'success' })
            emits('confirm')
          })
          .catch((err)=>{
            console.log(err);
          })
          .finally(() => {
            importLoading.value = false
          })
      }
    } else {
      message('导入接口地址为空', { type: 'warning' })
    }
  })
}
</script>

<style scoped></style>
