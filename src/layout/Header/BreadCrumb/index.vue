<template>
  <!-- 折叠菜单图标 -->
  <el-icon class="icon" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item v-for="(route, index) in $Route.matched" :key="index" :to="{ path: route.path}">
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 获取菜单状态仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 改变菜单状态
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}

let $Route = useRoute()
</script>

<style scoped>
.icon {
  margin-right: 10px;
}
</style>
