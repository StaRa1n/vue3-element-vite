<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    @select="handleSelect"
    r
  >
    <template v-for="(menu, index) in menuList" :key="index">
      <!-- 没有子组件 -->
      <template v-if="!menu.children">
        <el-menu-item :index="menu.path" v-if="!menu.meta.hidden">
          <template #title>
            <span>{{ menu.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 当子组件有且只有一个 -->
      <template v-if="menu.children && menu.children.length === 1">
        <el-menu-item :index="menu.path">
          <template #title>
            <span>
              <menu>{{ menu.children[0].meta.title }}</menu>
            </span>
          </template>
        </el-menu-item>
      </template>

      <!-- 子组件有多个 -->

      <template v-if="menu.children && menu.children.length > 1">
        <el-sub-menu :index="menu.path">
          <template #title>
            <span>{{ menu.meta.title }}</span>
          </template>
          <!-- 递归组件 -->
          <Menu :menuList="menu.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
defineProps(['menuList'])

//获取路由器对象
let $router = useRouter()

// 菜单点击相关
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  $router.push(key)
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
