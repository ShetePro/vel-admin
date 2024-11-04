<template>
  <el-button v-bind="attrs" @click="exportTable" :loading="exportLoading">
    <template #icon v-if="icon">
      <Icon :icon="icon" />
    </template>
    {{label || '导出'}}
  </el-button>
</template>

<script setup lang="ts">
import { downloadByBlob } from "@/utils/file";
import { ref, useAttrs } from "vue";
import { useMessage } from "@/hook/useMessage";
import { request } from "@/utils/http";
import Icon from "@/components/Icon/src/Icon.vue";
import { useRoute } from "vue-router";

type ExportButtonProps = {
  api: string
  label?: string
  icon?: string
  exportName?: string
  requestData?: Recordable
  requestQuery?: Recordable
}
const props = defineProps<ExportButtonProps>()
const emits = defineEmits(['confirm'])
const attrs = useAttrs()
const exportLoading = ref(false);
const {message} = useMessage()
const route = useRoute()

// 导出
function exportApi() {
  return request.post({
    url: props.api,
    responseType: 'blob',
    data: props.requestData,
    params: props.requestQuery,
  }, {
    isTransformRequestResult: false
  });
}

// 导出
function exportTable() {
  exportLoading.value = true;
  exportApi()
    .then((data) => {
      // 如果二进制类型不是excel格式 说明后台接口报错了 停止导出
      if (data.type === "application/json") {
        message("导出失败", {type: "warning"})
        return
      }
      const fileName: string = props.exportName || route.name as string || '导出文件'
      message("导出成功", { type: "success" });
      downloadByBlob(data, fileName + ".xlsx");
    })
    .finally(() => {
      exportLoading.value = false;
    });
}

</script>

<style scoped>

</style>
