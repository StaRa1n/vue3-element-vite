<template>
  <el-main class="layout_main">
    <RouterView></RouterView>
  </el-main>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout_main {
  padding: 20px;
  // height: calc(100vh - 80px);
  background-color: #ffffff;
}
</style>
