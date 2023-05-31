<template>
  <el-card
    class="hello"
    :body-style="{
      height: '120px',
      display: 'flex',
      alignItems: 'center',
    }"
  >
    <img :src="userStore.avatar" alt="" />
    <div class="name">
      <div>您好, {{ userStore.name }},祝您开心每一天</div>
      <div>{{ userStore.position }} | {{ userStore.department }}</div>
    </div>
    <div class="time">
      <p>当前时间:</p>
      <div>{{ time.toLocaleDateString() }}</div>
      <div>{{ time.toLocaleTimeString() }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

let time = ref(new Date())
setInterval(() => {
  time.value = new Date()
}, 1000)
</script>
<style lang="scss" scoped>
.hello {
  margin-bottom: 20px;
  img {
    border-radius: 50px;
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
  .name {
    :first-child {
      color: $font-color;
      font-size: 20px;
      margin-bottom: 20px;
    }
    :last-child {
      font-size: 14px;
      color: #9ca3af;
    }
  }
  .name {
    flex: 1;
  }
  .time {
    align-self: center;
    p {
      color: $font-color;
      font-size: 20px;
      margin-bottom: 10px;
    }
    div {
      color: #9ca3af;
    }
  }
}
</style>
