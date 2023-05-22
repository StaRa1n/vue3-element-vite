<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    @select="handleSelect"
  >
    <template v-for="(menu, index) in menuList" :key="index">
      <!-- 没有子组件 -->
      <el-menu-item v-if="!menu.children" :index="menu.path">
        <template #title>
          <span>{{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 当子组件有且只有一个 -->
      <el-menu-item
        v-if="menu.children && menu.children.length === 1"
        :index="menu.path"
      >
        <template #title>
          <span>
            <menu>{{ menu.children[0].meta.title }}</menu>
          </span>
        </template>
      </el-menu-item>
      <!-- 子组件有多个 -->
      <el-sub-menu
        :index="menu.path"
        v-if="menu.children && menu.children.length > 1"
      >
        <template #title>
          <span>{{ menu.meta.title }}</span>
        </template>
        <!-- 递归组件 -->
        <Menu :menuList="menu.children"></Menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['menuList'])

// 菜单点击相关
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<script lang="ts">
// 递归组件
export default {
  name: 'Menu',
}
</script>

<style lang="scss" scoped>
.el-menu-demo {
  border: 0;
}
</style>
