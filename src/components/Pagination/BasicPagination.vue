<template>
  <div class="flex flex-row justify-end pt-2">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="false"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="getTotal"
      v-bind="attrs"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { PaginationProps } from "element-plus";
import { computed, reactive, toRefs } from "vue";
import { isNumber } from "@/utils/is";

const props = defineProps<{
  pagination: PaginationProps
}>()
const emits = defineEmits(['size-change', 'current-change'])
const pagination = reactive(props.pagination)
const {
  currentPage = 1,
  pageSize = 10,
  small,
  disabled = false,
  background = false,
  total,
  pageSizes = [10, 20, 30, 40],
  ...attrs
} = toRefs(pagination)

const getTotal = computed(() => {
  return isNumber(total?.value) ? total?.value : Number(total?.value)
})
function sizeChange () {
  emits('size-change')
}
function currentChange () {
  emits('current-change')
}

</script>

<style scoped>

</style>
