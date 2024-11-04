<template>
  <el-select :model-value="selectName" v-bind="attrs" class="w-full">
    <el-option class="w-full h-full overflow-y-auto p-0" style="height: 270px; padding: 0">
      <el-tree
        ref="treeRef"
        class="w-full h-full overflow-y-auto"
        :node-key="nodeKey || 'id'"
        :data="treeData"
        :props="treeProps || {}"
        @current-change="handleNodeChange"
        highlight-current
        :default-expanded-keys="defaultExpandKeys || []"
      />
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { onMounted, ref, useAttrs, watch} from "vue";

const props = defineProps<{
  treeData: Recordable[];
  treeProps?: any;
  nodeKey: string;
  modelValue: string;
  defaultExpandKeys?: string[];
}>();
const emits = defineEmits(["select"]);
const attrs = useAttrs();
const selectData = useVModel(props, "modelValue", emits);
const treeRef = ref();

const treeLabel = props?.treeProps?.label || 'label' as string
const selectName = ref('')
watch(
  () => props.modelValue,
  (val) => {
    val && setSelect()
  }
);
onMounted(() => {
  setSelect()
});

function setSelect () {
  treeRef.value?.setCurrentKey(selectData.value);
  const data: KeyString = treeRef.value.getCurrentNode()
  if (data) {
    selectName.value = data[treeLabel || 'label']
  }
}
function handleNodeChange(data: KeyString) {
  selectName.value = data[treeLabel]
  selectData.value = data.id
  emits('select', data)
}
</script>

<style lang="scss" scoped>
:deep .input-tree-popper {
  min-height: 300px;
}
</style>
