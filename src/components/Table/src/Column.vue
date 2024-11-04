<template>
  <div v-if="!emptyColumn">
    <BasicSelect
      v-model="columnValue"
      :dictData="column.dictData"
      :dictUrl="column.dictUrl"
      :dictMethod="column.dictMethod"
      :dictQuery="column.dictQuery"
      :dictResponseHandle="column.dictResponseHandle"
      v-bind="column.props"
      v-if="column.type === 'select'"
      :detail="true"
    ></BasicSelect>
  </div>
  <div v-else>{{ columnValue }}</div>
</template>

<script setup lang="ts">
import { BasicTableColumn, BasicTableOptions } from '@/components/Table/src/types'
import { computed, ref, watch } from 'vue'
import BasicSelect from '@/components/Select/BasicSelect.vue'
import { isEmpty, isNullOrUnDef } from '@/utils/is'
const props = defineProps<{
  row: any
  column: BasicTableColumn
  options: BasicTableOptions
}>()

const column = computed(() => {
  return props.column
})
const columnValue = ref(props.row[column.value.prop])
const emptyColumn = computed(() => {
  return isNullOrUnDef(columnValue.value) || isEmpty(columnValue.value)
})
watch([() => props.row, () => props.column], () => {
  columnValue.value = props.row[column.value.prop]
})
</script>

<style scoped></style>
