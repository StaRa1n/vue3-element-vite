<template>
  <el-button type="primary" circle icon="Refresh" @click="refresh"></el-button>
  <el-button type="primary" circle icon="FullScreen" @click="fullScreen"></el-button>
  <el-button type="primary" circle icon="Setting"></el-button>
  <img src="../../../../public/logo.png" style="height: 32px" class="logo" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>登录</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

let fresh = ref(true)

// 刷新业务
const refresh = () => {
  fresh = ref(!fresh.value) 
  if(fresh.value) {

  }else {
    
  }
}


// 全屏业务
const fullScreen = () => {
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  }else{
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.logo {
  margin-left: 12px;
}
</style>
