<template>
  <el-aside width="200px" class="layout_aside">
    <div class="logo">
      <img src="../../../public/logo.png" />
      <p>OA办公系统</p>
    </div>
    <el-scrollbar class="scrollbar">
      <Menu :menuList="userStore.menuRoute" />
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import Menu from './Menu/index.vue'

let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout_aside {
  height: 100vh;
  width: 250px;
  justify-content: space-between;
  .logo {
    display: flex;
    img {
      height: 50px;
    }
  }
  .scrollbar {
    height: calc(100vh - 50px);
  }
}
</style>
