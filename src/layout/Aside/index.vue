<template>
  <el-aside class="layout_aside" :class="LayOutSettingStore.fold ? 'fold' : ''">
    <div class="logo">
      <img src="../../../public/logo.png" />
    </div>
    <el-scrollbar class="scrollbar">
      <el-menu
        class="el-menu-demo"
        :default-active="$Route.path"
        :collapse="LayOutSettingStore.fold"
      >
        <Menu :menuList="userStore.menuRoute" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import Menu from './Menu/index.vue'
// 获取路由对象用于刷新保存当前菜单激活项
import { useRoute } from 'vue-router'

// 获取用户小仓库
let userStore = useUserStore()
// 获取路由
let $Route = useRoute()

// 控制菜单折叠
import useLayOutSettingStore from '@/store/modules/setting'

let LayOutSettingStore = useLayOutSettingStore()
</script>

<style lang="scss" scoped>
.layout_aside {
  height: 100vh;
  width: 250px;
  justify-content: space-between;
  border-right: $border;
  transition: all 0.8s;
  // 折叠后宽度
  &.fold {
    width: 70px;
  }

  .logo {
    display: flex;
    align-items: center;
    img {
      height: 50px;
    }
  }
  .scrollbar {
    height: calc(100vh - 50px);
    .el-menu-demo {
      border: 0;
      width: 100%;
    }
  }
}
</style>
