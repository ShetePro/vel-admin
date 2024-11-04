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
      <BasicForm ref="formRef" v-model="dialogFormData" :option="formOption">
        <template #deptId>
          <InputTree
            v-model="dialogFormData.deptId"
            :disabled="formOption.disabled"
            node-key="id"
            :tree-data="deptTreeData"
          >
          </InputTree>
        </template>
      </BasicForm>
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
import { validateMobile } from '@/components/Form/src/rules'
import { addUserApi, updateUserApi } from '@/api/sys/user'
import InputTree from '@/components/InputTree/InputTree.vue'
import { roleData } from "@/data/roleData";

const dialog = ref<BasicDialogMethods>()
const { message } = useMessage()
const emits = defineEmits(['reload'])
let dialogFormData = ref()
const dialogLoading = ref<boolean>(false)
const titles = {
  create: '新增用户',
  update: '编辑用户',
  detail: '用户详情'
}
let status = ref<MainDialogStatus>('create')
const deptTreeData = ref([])
const formRef = ref<BasicFormMethods>()
const formOption = computed(() => {
  return {
    labelWidth: '80px',
    disabled: status.value === 'detail',
    column: [
      {
        label: '用户名',
        prop: 'userName',
        span: 12,
        rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
      },
      {
        label: '用户姓名',
        prop: 'name',
        span: 12
      },
      {
        label: '角色类型',
        prop: 'roleIds',
        type: 'select',
        dictData: roleData,
        props: {
          multiple: true,
          propsOption: {
            label: 'roleName',
            value: 'id'
          }
        },
        span: 12,
        rules: [{ required: true, message: '角色类型不能为空', trigger: 'blur' }]
      },
      {
        label: '职务',
        prop: 'post'
      },
      {
        label: '邮箱',
        prop: 'email',
        rules: [{ type: 'email', message: '邮箱类型错误', trigger: 'blur' }],
        span: 12
      },
      {
        label: '联系电话',
        prop: 'mobile',
        rules: [{ validator: validateMobile, trigger: 'blur' }],
        span: 12
      },
      {
        label: '描述',
        prop: 'description',
        props: {
          type: 'textarea'
        },
        span: 24
      }
    ]
  }
})
function open(formData: Recordable, mode: MainDialogStatus = 'create') {
  dialogFormData.value = { ...formData }
  status.value = mode
  dialog.value?.showDialog()
}
function submitDialog() {
  formRef.value
    ?.submitForm()
    .then(() => {
      const isCreate = status.value === 'create'
      const api = isCreate ? addUserApi : updateUserApi
      dialogLoading.value = true
      try {
        api({
          ...dialogFormData.value,
          roleList: [dialogFormData.value.roleList]
        })
          .then(() => {
            message(isCreate ? '新增成功' : '修改成功', { type: 'success' })
            dialog.value?.hideDialog()
            emits('reload')
          })
          .finally(() => {
            dialogLoading.value = false
          })
      } catch (error) {
        console.error(error)
      }
    })
    .catch(() => {
      message('表单填写有误', { type: 'warning' })
      dialogLoading.value = false
    })
}
function closeDialog() {
  formRef.value?.resetForm()
  delete dialogFormData.value.id
}
defineExpose({
  open
})
</script>

<style scoped></style>
