<template>
    <!-- el-plus 全局配置 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
// 中文环境
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'

</script>
