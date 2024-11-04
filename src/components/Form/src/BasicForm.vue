<template>
  <div class="basic-form w-full">
    <el-form
      ref="formRef"
      :model="formData"
      :label-width="getFormOption.labelWidth"
      :label-position="getFormOption.labelPosition"
      :validate-on-rule-change="false"
      :rules="rules"
      @validate="validateChange"
    >
      <el-row class="flex flex-row flex-wrap" :gutter="20">
        <el-col
          v-for="col in getFormRenderColumn"
          :key="getFormItemKey(col)"
          :span="col.span"
          :style="getFormItemStyle(col)"
        >
          <el-form-item
            v-if="col.slot"
            :label="col.label"
            :prop="col.prop"
            :label-width="col.labelWidth || getFormOption.labelWidth"
          >
            <slot :name="col.prop"></slot>
          </el-form-item>
          <BasicFormItem
            v-model="formData[col.prop]"
            v-else
            :col="col"
            :options="getFormOption"
            :formData="formData"
            :disabled="isDisabled || col.disabled"
          >
          </BasicFormItem>
        </el-col>
        <slot name="menu">
          <el-col> </el-col>
        </slot>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import { BasicFormMethods, BasicFormOption } from '@/components/Form/src/types'
import {
  getDefaultOption,
  getFormDefault,
  getFormItemKey,
  getFormRule,
  getFormItemStyle
} from '@/components/Form/src/util'
import { isEmpty } from '@/utils/is'
import BasicFormItem from '@/components/Form/src/BasicFormItem.vue'
const props = defineProps<{
  modelValue: Recordable
  option: Partial<BasicFormOption>
}>()
const emits = defineEmits(['update:modelValue', 'validate'])
const formRef = ref<FormInstance>()
let formData = ref<Recordable>({})
let formOption = ref<Partial<BasicFormOption>>(props.option)

const getFormOption = computed(() => {
  return getDefaultOption(formOption.value)
})
const getFormRenderColumn = computed(() =>
  getFormOption.value.column.filter((item) => item.display)
)
const rules = computed(() => {
  return isDisabled.value ? {} : getFormRule(getFormOption.value.column)
})
const isDisabled = computed(() => {
  return getFormOption.value.disabled
})
watch(
  () => props.option,
  () => {
    formOption.value = props.option
    setFormVal(props.modelValue)
  }
)
watch(
  () => formData.value,
  (val) => {
    emits('update:modelValue', Object.assign(val || {}, props.modelValue || {}))
  },
  { deep: true }
)
// 监听双向绑定变更
watch(
  () => props.modelValue,
  (val) => {
    setFormVal(val || {})
  }
)

onMounted(() => {
  setFormData()
})

function setFormVal(val: Recordable) {
  const result = getFormDefault(val, getFormOption.value.column)
  if (isEmpty(val)) {
    formData.value = result
    clearValidate()
  } else {
    // 变更ref 单个属性使用vue change 的 diff判断来防止无限watch
    // 不会去除没在option内的字段
    // for (let key in result) {
    //   formData.value[key] = result[key];
    // }
    formData.value = val
  }
}
function setFormData(data = props.modelValue) {
  formData.value = getFormDefault(data, getFormOption.value.column)
}
function getFormData() {
  return formData
}
function resetForm() {
  formRef.value?.resetFields()
  emits('update:modelValue', {})
}
function clearValidate() {
  setTimeout(() => {
    formRef.value?.clearValidate(getFormOption.value.column.map((item) => item.prop))
  }, 100)
}
const submitForm = async () => {
  if (!formRef.value) return
  await new Promise((resolve, reject) => {
    formRef?.value?.validate((valid, fields) => {
      if (valid) {
        resolve(valid)
      } else {
        reject(fields)
      }
    })
  })
}
function validateChange(valid: boolean, fields: Recordable) {
  emits('validate', { valid, fields })
}

// 暴露实例方法
defineExpose<BasicFormMethods>({
  submitForm,
  resetForm,
  getFormData,
  clearValidate
})
</script>

<style scoped></style>
