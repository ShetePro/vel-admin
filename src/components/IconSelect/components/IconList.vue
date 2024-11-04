<template>
  <div class="icon-select-list flex flex-col">
    <div class="list flex flex-row gap-1 flex-wrap overflow-y-auto h-40">
      <el-icon
        class="p-1 hover:bg-gray-100 cursor-pointer"
        :class="{
          'active-icon': selectIcon === `mdi-light:${item}`
        }"
        v-for="item in iconNames"
        :key="item"
        size="20"
        @click="handleClick(`mdi-light:${item}`)"
      >
        <Icon :icon="`mdi-light:${item}`" class="icon-item"></Icon>
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconJson from '@iconify-json/mdi-light/icons.json'
import { onMounted, ref } from 'vue'
import { Icon } from '@/components/Icon/index'

const emits = defineEmits(['change'])
const iconNames = ref({})
const selectIcon = defineModel()
onMounted(() => {
  iconNames.value = Object.keys(IconJson.icons)
})
function handleClick(item: string) {
  selectIcon.value = item
  emits('change', item)
}
</script>

<style scoped>
.active-icon {
  color: var(--primary-color);
}
</style>
