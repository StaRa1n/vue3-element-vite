<template>
  <div>
    <template v-for="(menu, index) in menuList" :key="index">
      <!-- 没有子组件 -->
      <template v-if="!menu.children">
        <el-menu-item
          :index="menu.path"
          v-if="!menu.meta.hidden"
          @click="handleSelect(menu.path)"
        >
          <el-icon>
            <component :is="menu.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ menu.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 当子组件有且只有一个 -->
      <template v-if="menu.children && menu.children.length === 1">
        <el-menu-item
          :index="menu.children[0].path"
          @click="handleSelect(menu.path)"
        >
          <el-icon>
            <component :is="menu.meta.icon"></component>
          </el-icon>
          <template #title>
            <!-- <el-menu-item-group title="menu.meta.title"> -->
            <menu>{{ menu.children[0].meta.title }}</menu>
            <!-- </el-menu-item-group> -->
          </template>
        </el-menu-item>
      </template>

      <!-- 子组件有多个 -->

      <template
        v-if="menu.children && menu.children.length > 1"
        @click="handleSelect(menu.path)"
      >
        <el-sub-menu :index="menu.path">
          <template #title>
            <el-icon>
              <component :is="menu.meta.icon"></component>
            </el-icon>
            <span>{{ menu.meta.title }}</span>
          </template>
          <!-- 递归组件 -->
          <Menu :menuList="menu.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])

// 获取路由器对象用于切换路由
let $router = useRouter()

// 菜单点击相关
const handleSelect = (path: any) => {
  $router.push(path)
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
