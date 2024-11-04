<template>
  <el-dialog
    class="basic-dialog"
    v-model="dialogVisible"
    :title="title"
    v-bind="attrs"
    :style="{
      width: props.width || '300px',
      minWidth: props.minWidth || '300px',
    }"
    draggable
    :before-close="handleClose"
  >
    <template #header>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer v-if="props.showFooter">
      <slot name="footer">
        <span class="dialog-footer">
          <el-button @click="hideDialog">取消</el-button>
          <el-button :loading="getDisabled" type="primary" @click="handleConfirm">
            确定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs } from "vue";
import { BasicDialogMethods } from "@/components/Dialog/src/types";
import { DialogProps } from "element-plus";

interface BasicDialogProps extends Partial<DialogProps> {
  loading?: boolean;
  showFooter?: boolean;
  title: string
  minWidth?: string
}
const props = defineProps<BasicDialogProps>();
const attrs = useAttrs()
const emits = defineEmits(['submit'])
const dialogVisible = ref<boolean>(false);
const getDisabled = computed(() => {
  return props.loading
})
function handleConfirm () {
  emits('submit')
}
function handleClose() {
  hideDialog();
}
function showDialog() {
  dialogVisible.value = true;
}
function hideDialog() {
  dialogVisible.value = false;
}
defineExpose<BasicDialogMethods>({
  showDialog,
  hideDialog,
});
</script>

<style scoped>
.basic-dialog {
}
:deep(.el-dialog__body) {
  flex: 1;
}
</style>
