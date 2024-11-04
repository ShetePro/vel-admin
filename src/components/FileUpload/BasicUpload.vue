<template>
  <el-upload
    v-model:file-list="modelValue"
    class="upload-demo"
    list-type="picture"
    :action="props.action || getDefaultAction"
    :accept="props.accept||defaultAccept"
    :multiple="props.multiple"
    :on-preview="handlePreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :limit="props.limit"
    :on-exceed="handleExceed"
  >
    <el-button type="primary" v-if="!props.disabled">上传附件</el-button>
    <template #file="{ file }">
      <div class="w-full flex flex-row justify-between items-center">
        <div class="flex flex-row items-center">
          <el-image
            v-if="file.fileType === 2"
            v-loading="!file.preViewUrl"
            style="width: 50px; height: 50px"
            fit="cover"
            :preview-teleported="true"
            :preview-src-list="srcList"
            :src="file.preViewUrl"
          ></el-image>
          <span class="ml-2 hover:text-cyan-600 cursor-pointer" @click="handlePreview(file)">{{
            file.originalFileName
          }}</span>
        </div>
        <Icon
          v-if="!props.disabled"
          class="cursor-pointer hover:text-red-500"
          icon="fluent:delete-20-regular"
          @click="handleDelete(file)"
        ></Icon>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        <slot name="tip"> 附件大小不能超过 5MB. </slot>
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { UploadFile } from 'element-plus'
import Icon from '@/components/Icon/src/Icon.vue'
import { useMessage } from '@/hook/useMessage'
import { bytesToMB } from '@/utils/util'
import { globalConfig } from '@/config/global'

const modelValue = defineModel<Recordable[]>({ default: [] })
const srcList = modelValue.value.map((item) => {
  return item.preViewUrl
})

const props = defineProps<{
  action?: string
  multiple?: boolean
  disabled?: boolean
  limit?: number
  accept?:string
}>()

const { message } = useMessage()
const getDefaultAction = computed(() => {
  return globalConfig.proxyPrefix + '/rest/file/savefileToOss'
})
const defaultAccept=".jpg,.jpeg,.png,.docx,.doc,.pdf,.xlsx,.xls,.ppt,.pptx,.text,.txt"
function handleSuccess(response: any, uploadFile: UploadFile, uploadFiles) {
  const { code, data } = response
  if (code === '200' && data) {
    modelValue.value = uploadFiles.map((item) => item?.response?.data || item)
  }
}
function beforeUpload(file: File) {
  const size = bytesToMB(file.size)
  if (Number(size) >= 10) {
    message('附件大小不能大于10MB', { type: 'warning' })
    return false
  }
}
function handlePreview(file: Recordable) {
  window.open(file.ossFullPath)
}
function handleRemove() {}
function beforeRemove() {}
function handleDelete(file: Recordable) {
  const index = modelValue.value.findIndex((item) => item.id === file.id)
  if (index >= 0) {
    modelValue.value.splice(index, 1)
  }
}
function handleExceed() {
  message(`附件上传数量不能大于${props.limit}个`, { type: 'warning' })
}
</script>

<style scoped></style>
