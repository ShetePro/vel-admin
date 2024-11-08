<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.width || ''"
    :key="column.prop"
    :align="column.align"
    v-bind="getColumnBindProps(column)"
  >
    <template v-if="column.children?.length">
      <TableColumn
        v-for="col in column.children"
        :key="col.prop"
        :column="col"
        :options="options"
        :slots="slots"
      >
      </TableColumn>
    </template>
    <template v-if="!column.children?.length" #default="{ row }">
      <SlotRender v-if="column.slot" :name="column.prop" :slots="slots" :row="row" />
      <Column
        v-else-if="column.type && column.type !== 'text'"
        :row="row"
        :column="column"
        :options="options"
      />
      <span v-else>
        {{ row[column.prop] }}
      </span>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { BasicTableColumn, BasicTableOptions } from '@/components/Table/src/types'
import Column from '@/components/Table/src/Column.vue'
import SlotRender from '@/components/Table/src/slotRender'

const props = defineProps<{
  column: BasicTableColumn
  options: BasicTableOptions
  slots: any
}>()
// v-bind 如果有 type 属性则会影响表格树数据展示
function getColumnBindProps(data: Recordable) {
  const props = structuredClone(data)
  delete props.type
  return props
}
</script>

<style lang="scss" scoped></style>
