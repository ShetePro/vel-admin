<template>
  <div class="basic-select">
    <el-radio-group v-model="data" v-bind="attrs" :clearable="isUnDef(attrs.clearable) ? true : attrs.clearable">
      <el-radio
        v-for="item in getOptionList"
        :key="item[getPropsOption.value]"
        :label="item[getPropsOption.value]"
        @click="optionClick(item)"
      >
        {{item[getPropsOption.label]}}
      </el-radio>
      <slot></slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from 'vue'
import { useVModel } from '@vueuse/core'
import { isUnDef} from '@/utils/is'

const props = defineProps<{
  modelValue: number | string | undefined
  dictData?: Recordable
  dictUrl?: string
  dictQuery?: { data?: Recordable; params?: Recordable }
  dictMethod?: string
  detail?: boolean
  propsOption?: { value: string; label: string }
}>()
const emits = defineEmits(['optionClick', 'update:modelValue'])

const attrs = useAttrs()
const data = useVModel(props, 'modelValue', emits)
const optionList = ref<Recordable>([])
const getOptionList = computed((): Recordable => {
  return props.dictData || optionList.value
})
const getPropsOption = computed(() => {
  return Object.assign({ label: 'label', value: 'value' }, props.propsOption)
})

onMounted(() => {
})
function optionClick(item) {
  emits('optionClick', item)
}
</script>

<style scoped></style>
