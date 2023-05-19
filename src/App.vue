<script setup lang="ts">
// element默认中文
import locale from 'element-plus/lib/locale/lang/zh-cn.js'
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
