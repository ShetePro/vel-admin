<template>
  <div>
    <BasicDialog
      :title="titles[status]"
      ref="dialog"
      width="40%"
      :showFooter="status !== 'detail'"
      :loading="dialogLoading"
      @submit="submitDialog"
      @closed="closeDialog"
    >
      <BasicForm ref="formRef" v-model="dialogFormData" :option="formOption"></BasicForm>
    </BasicDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BasicForm } from '@/components/Form'
import { BasicDialog } from '@/components/Dialog'
import { BasicDialogMethods } from '@/components/Dialog/src/types'
import { useMessage } from '@/hook/useMessage'
import { BasicFormMethods } from '@/components/Form/src/types'

const dialog = ref<BasicDialogMethods>()
const { message } = useMessage()
const emits = defineEmits(['reload'])
let dialogFormData = ref({})
const dialogLoading = ref<boolean>(false)
const titles = {
  create: '新增角色',
  update: '编辑角色',
  detail: '角色详情'
}

let status = ref<MainDialogStatus>('create')
const formRef = ref<BasicFormMethods>()
const formOption = computed(() => {
  return {
    labelWidth: '80px',
    disabled: status.value === 'detail',
    column: [
      {
        label: '角色名称',
        prop: 'roleName',
        span: 24,
        rules: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      {
        label: '角色标识',
        prop: 'roleKey',
        span: 24,
        rules: [{ required: true, message: '角色标识不能为空', trigger: 'blur' }]
      },
      {
        label: '描述',
        prop: 'remark',
        props: {
          type: 'textarea',
          rows: 5
        },
        span: 24
      }
    ]
  }
})
function open(formData: Recordable, mode: MainDialogStatus = 'create') {
  dialog.value?.showDialog()
  dialogFormData.value = { ...formData }
  status.value = mode
}
function submitDialog() {
  formRef.value
    ?.submitForm()
    .then(() => {
      const isCreate = status.value === 'create'
      dialog.value?.hideDialog()
      message(isCreate ? '新增成功' : '修改成功', { type: 'success' })
      emits('reload')
    })
    .catch(() => {
      message('表单填写有误', { type: 'warning' })
    })
}
function closeDialog() {
  formRef.value?.resetForm()
}

defineExpose({
  open
})
</script>

<style scoped></style>
