<script setup lang="ts">
// element默认中文
import locale from 'element-plus/lib/locale/lang/zh-cn.js'
</script>

<template>
  <div>
    <el-config-provider :locale="locale">
      <h1>这里是App</h1>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
