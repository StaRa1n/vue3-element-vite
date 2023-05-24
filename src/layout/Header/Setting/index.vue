<template>
  <el-button type="primary" circle icon="Refresh" @click="refresh"></el-button>
  <el-button type="primary" circle icon="FullScreen" @click="fullScreen"></el-button>
  <el-button type="primary" circle icon="Setting"></el-button>
  <img :src="userStore.avatar" style="height: 32px" class="logo" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>登录</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user';

let LayOutSettingStore = useLayOutSettingStore()

let $router = useRouter()

let userStore = useUserStore()
// 刷新业务
const refresh = () => {
 LayOutSettingStore.refresh = !LayOutSettingStore.refresh
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

const logout = () => {
  // 1.向服务器发请求[退出登录接口]
  // 2.仓库中用户登录的相关数据清空[token|username|avatar]
  // 3.路由跳转至登录
  userStore.userLogout()
  $router.push({path: '/login'})
}
</script>

<style scoped>
.logo {
  margin-left: 12px;
}
</style>
