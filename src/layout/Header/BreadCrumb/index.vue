<template>
  <!-- 折叠菜单图标 -->
  <el-icon class="icon" @click="changeIcon">
    <Expand class="expand" :class="LayOutSettingStore.fold ? 'rotate' : ''" />
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(route, index) in $Route.matched"
      :key="index"
      :to="{ path: route.path }"
    >
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 获取菜单状态仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 改变菜单状态
let rotate = false
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
  rotate = !rotate
  console.log(rotate)
}

let $Route = useRoute()
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
}
.expand {
  transform: rotate(0deg);
  transition: transform 0.8s ease-in-out;
  &.rotate {
    transform: rotate(-180deg);
    transition: transform 0.8s ease-in-out;
  }
}
</style>
