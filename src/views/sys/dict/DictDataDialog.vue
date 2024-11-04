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
import { BasicFormMethods, BasicFormOption } from '@/components/Form/src/types'
import { addDictDataApi, updateDictDataApi } from '@/api/sys/dict'

const dialog = ref<BasicDialogMethods>()
const { message } = useMessage()
const emits = defineEmits(['reload'])
let dialogFormData = ref({})
const dialogLoading = ref<boolean>(false)
const titles = {
  create: '新增字典项',
  update: '编辑字典项',
  detail: '字典项详情'
}

let status = ref<MainDialogStatus>('create')
const formRef = ref<BasicFormMethods>()
const formOption = computed<Partial<BasicFormOption>>(() => {
  return {
    labelWidth: '120px',
    disabled: status.value === 'detail',
    column: [
      {
        label: '字典类型',
        prop: 'dictId',
        type: 'select',
        dictUrl: '/rest/sys/dict/getPage',
        dictMethod: 'post',
        dictResponseHandle(res) {
          return res.rows
        },
        props: {
          clearable: false,
          propsOption: {
            label: 'remarks',
            value: 'id'
          }
        },
        span: 24,
        rules: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }]
      },
      {
        label: '字典名称',
        prop: 'label',
        span: 24,
        rules: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      {
        label: '字典值',
        prop: 'value',
        span: 24,
        rules: [{ required: true, message: '字典值不能为空', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number'
      },
      {
        label: '备注',
        prop: 'remarks',
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
      const api = isCreate ? addDictDataApi : updateDictDataApi
      dialogLoading.value = true
      api(dialogFormData.value)
        .then(() => {
          message(isCreate ? '新增成功' : '修改成功', { type: 'success' })
          dialog.value?.hideDialog()
          emits('reload')
        })
        .finally(() => {
          dialogLoading.value = false
        })
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
