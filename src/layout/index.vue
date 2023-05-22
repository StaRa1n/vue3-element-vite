<script setup lang="ts">
import Herder from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
</script>

<template>
  <el-container class="layout_container">
    <Aside />
    <el-container class="right">
      <Herder />
      <el-main class="layout_main">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.right {
  flex-direction: column;
}
</style>
