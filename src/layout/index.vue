<template>
  <el-container class="layout_container">
    <Aside />
    <el-container class="right">
      <Herder />
      <Main/>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Herder from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'

</script>



<style lang="scss" scoped>
.right {
  flex-direction: column;
}
</style>
