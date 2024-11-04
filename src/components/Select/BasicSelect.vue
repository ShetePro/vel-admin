<template>
  <div class="basic-select">
    <el-select
      v-model="data"
      v-bind="attrs"
      v-if="!detail"
      :value-key="getPropsOption.value"
      :clearable="isUnDef(attrs.clearable) ? true : attrs.clearable"
    >
      <el-option
        v-for="item in getOptionList"
        :key="item[getPropsOption.value]"
        :value="item[getPropsOption.value]"
        :label="item[getPropsOption.label]"
        @click="optionClick(item)"
      >
      </el-option>
      <slot></slot>
    </el-select>
    <div v-else>
      <div class="flex flex-row flex-wrap gap-1 justify-center">
        <el-tag effect="dark" v-for="item in getDetailText" :key="item">
          {{ item }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { DictItem } from '@/types/dict'
import { useVModel } from '@vueuse/core'
import { useDict } from '@/hook/useDict'
import { isArray, isUnDef } from '@/utils/is'

const props = defineProps<{
  modelValue: number | string | undefined
  dictData?: Recordable
  dictUrl?: string
  dictQuery?: { data?: Recordable; params?: Recordable }
  dictMethod?: string
  dictResponseHandle?: (res: Recordable) => Recordable[]
  detail?: boolean
  propsOption?: { value: string; label: string }
}>()
const emits = defineEmits(['optionClick', 'update:modelValue'])

const attrs = useAttrs()
const data = useVModel(props, 'modelValue', emits)
const { getDictByProp, requestDict } = useDict()
const optionList = ref<Recordable>([])
const getOptionList = computed((): Recordable => {
  return props.dictData || optionList.value
})
const getPropsOption = computed(() => {
  return Object.assign({ label: 'label', value: 'value' }, props.propsOption)
})
const getDetailText = computed(() => {
  const { dictData } = props
  const { value, label } = getPropsOption.value
  let textList = []
  if (isArray(data.value)) {
    data.value.forEach((dataValue) => {
      const dictItem = dictData?.find((item: Recordable) => item[value] === dataValue)
      textList.push(dictItem ? dictItem[label] : data.value)
    })
  } else {
    textList.push(
      dictData
        ? dictData.find((item: Recordable) => item[value] === data.value)?.[label]
        : data.value
    )
  }
  return textList
})
watch(
  () => props.dictQuery,
  () => {
    props.dictUrl && requestDict({
      prop: 'option',
      dictUrl: props.dictUrl,
      dictMethod: props.dictMethod,
      dictQuery: props.dictQuery,
      dictResponseHandle: props.dictResponseHandle
    }).then(() => {
      optionList.value = getDictByProp('option')
    })
  }
)
onMounted(() => {
  if (!props.dictData && props.dictUrl) {
    requestDict({
      prop: 'option',
      dictUrl: props.dictUrl,
      dictMethod: props.dictMethod,
      dictQuery: props.dictQuery,
      dictResponseHandle: props.dictResponseHandle
    }).then(() => {
      optionList.value = getDictByProp('option')
    })
  }
})
function optionClick(item: DictItem) {
  emits('optionClick', item)
}
</script>

<style scoped></style>
