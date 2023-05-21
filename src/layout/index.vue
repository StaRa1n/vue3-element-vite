<script setup lang="ts">
import Herder from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
</script>

<template>
  <el-container class="layout_container">
    <Aside />
    <el-container class="left">
      <Herder />
      <Main />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.left {
  flex-direction: column;
}
</style>
