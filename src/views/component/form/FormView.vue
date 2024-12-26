<template>
  <div class="bg-white rounded-md p-5">
    <BasicForm ref="formRef" v-model="dialogFormData" :option="formOption"> </BasicForm>
    <div class="flex justify-end">
      <el-button round class="w-[100px]" @click="handleClear">清空</el-button>
      <el-button type="primary" round class="w-[100px]" @click="handleSubmit">提交</el-button>
    </div>
    <div>
      {{ dialogFormData }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicForm } from '@/components/Form'
import { computed, ref, useTemplateRef } from 'vue'
import { roleData } from '@/data/roleData'
import { validateMobile } from '@/components/Form/src/rules'
import { BasicFormMethods, BasicFormOption } from '@/components/Form/src/types'
import { useMessage } from '@/hook/useMessage'
const {message} = useMessage()
let dialogFormData = ref()
const formRef = useTemplateRef<BasicFormMethods>('formRef')
const handleSubmit = ()=> {
  formRef?.value?.submitForm().then(() => {
    message('提交成功', { type: 'success' })
  })
}
function handleClear () {
  formRef?.value?.resetForm()
}
const formOption = computed<BasicFormOption>(() => {
  return {
    labelWidth: '80px',
    disabled: false,
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
</script>

<style scoped></style>
