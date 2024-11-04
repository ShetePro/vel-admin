<template>
  <el-form-item
    :label="col.label"
    :prop="col.prop"
    :label-width="col.labelWidth || options.labelWidth"
  >
    <!--自定义组件 -->
    <component
      v-if="col.component"
      v-model="val"
      class="w-full"
      :is="col.component"
      :disabled="disabled"
      v-on="col.on || {}"
      v-bind="col.props || {}"
    />
    <!--文本框 -->
    <el-input
      v-if="col.type === 'text' && !col.component"
      v-model="val"
      class="w-full"
      :placeholder="`请输入 ${col.label}`"
      :disabled="disabled"
      v-on="col.on || {}"
      v-bind="col.props"
    ></el-input>
    <!--下拉框 -->
    <BasicSelect
      v-model="val"
      v-if="col.type === 'select' && !col.component"
      class="w-full"
      :dictData="col.dictData"
      :dictUrl="col.dictUrl"
      :dictMethod="col.dictMethod"
      :dictQuery="col.dictQuery"
      :dictResponseHandle="col.dictResponseHandle"
      :disabled="disabled"
      v-bind="col.props"
      v-on="col.on || {}"
      :placeholder="col.placeholder || `请选择 ${col.label}`"
      :detail="false"
    ></BasicSelect>
    <!--日期-->
    <el-date-picker
      v-model="val"
      :disabled="disabled"
      style="width: 100%"
      :placeholder="`请选择 ${col.label}`"
      v-bind="col.props"
      v-on="col.on || {}"
      v-if="col.type === 'date' && !col.component"
    />
    <!--数字框-->
    <el-input-number
      v-model="val"
      :disabled="disabled"
      style="width: 100%"
      :placeholder="`请选择 ${col.label}`"
      v-bind="col.props"
      v-on="col.on || {}"
      v-if="col.type === 'number' && !col.component"
    />
    <!--switch-->
    <el-switch
      v-model="val"
      :disabled="disabled"
      :placeholder="`请选择 ${col.label}`"
      v-bind="col.props"
      v-on="col.on || {}"
      v-if="col.type === 'switch' && !col.component"
    />
    <!--radio-->
    <BasicRadio
      v-model="val"
      :dictData="col.dictData"
      :disabled="disabled"
      :placeholder="`请选择 ${col.label}`"
      v-bind="col.props"
      v-on="col.on || {}"
      v-if="col.type === 'radio' && !col.component"
    />
    <!--upload-->
    <BasicUpload
      v-model="val"
      class="w-full"
      :disabled="disabled"
      v-bind="col.props"
      v-on="col.on || {}"
      v-if="col.type === 'upload' && !col.component"
    >
    </BasicUpload>
  </el-form-item>
</template>

<script setup lang="ts">
import { BasicFormColumnProps, BasicFormOption } from '@/components/Form/src/types'
import BasicSelect from '@/components/Select/BasicSelect.vue'
import { useVModel } from '@vueuse/core'
import BasicRadio from '@/components/Radio/BasicRadio.vue'
import BasicUpload from '@/components/FileUpload/BasicUpload.vue'

const props = defineProps<{
  formData: Recordable
  modelValue: Recordable
  col: BasicFormColumnProps
  options: BasicFormOption
  disabled: boolean | undefined
}>()
const emits = defineEmits(['update:modelValue'])
const val = useVModel(props, 'modelValue', emits)
</script>

<style scoped></style>
