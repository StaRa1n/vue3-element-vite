<script setup lang="ts">
// element默认中文
import locale from 'element-plus/lib/locale/lang/zh-cn.js'

import { onMounted } from 'vue'
import { reqLogin } from './api/user'
// 测试请求
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<template>
  <div>
    <el-config-provider :locale="locale">
      <h1>这里是App</h1>
      <SvgIcon></SvgIcon>
    </el-config-provider>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    font-weight: normal;
  }
}
h1 {
  color: $color;
}
</style>
