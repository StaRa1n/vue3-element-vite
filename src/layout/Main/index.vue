<template>
  <el-main class="layout_main" v-if="flag">
    <RouterView></RouterView>
  </el-main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import { watch } from 'vue'

let flag = ref(true)
let layOutSettingStore = useLayOutSettingStore()
// 刷新业务
watch(
  () => layOutSettingStore.refresh,
  () => {
    flag.value = false
    setTimeout(() => {
      flag.value = true
    }, 100)
  },
)
</script>

<style lang="scss" scoped>
.layout_main {
  padding: 20px;
  // height: calc(100vh - 80px);
  background-color: #ffffff;
}
</style>
