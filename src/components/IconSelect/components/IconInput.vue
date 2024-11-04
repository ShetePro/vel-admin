<template>
  <div class="icon-select-input">
    <el-popover
      placement="top-start"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <el-input class="m-2" v-model="modelValue"></el-input>
      </template>
      <IconList v-model="modelValue" />
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import IconList from "@/components/IconSelect/components/IconList.vue";

const modelValue = defineModel()
</script>

<style scoped></style>
