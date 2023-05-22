<template>
  <el-header class="layout_header">
    <div class="header_left">
      <!-- 左侧面包屑 -->
      <Breadcrumb/>
    </div>
    <div class="header_right">
      <Setting/>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import Breadcrumb  from './BreadCrumb/index.vue';
import Setting  from './Setting/index.vue';


</script>

<style lang="scss" scoped>
.layout_header {
  width: 100%;
  height: 60px;
  border-bottom: $border;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header_left {
    display: flex;
    align-items: center;
    
  }
  .header_right {
    display: flex;
    align-items: center;
  }
}
</style>
