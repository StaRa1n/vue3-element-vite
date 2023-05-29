<template>
  <el-row gutter="20">
    <el-col :span="17">
      <el-card class="hello">你好,{{ userStore.username }}</el-card>
      <el-card class="fastReq">快速申请</el-card>
    </el-col>
    <el-col :span="7">
      <el-card class="signin">考勤打卡</el-card>
    </el-col>
  </el-row>
  <el-row gutter="20">
    <el-col :span="10">
      <el-card class="message">消息公告</el-card>
    </el-col>
    <el-col :span="14">
      <el-card class="reqList">申请列表</el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  .hello {
    margin-bottom: 20px;
    height: 120px;
  }
  .signin {
    height: 260px;
  }
  .message,
  .reqList {
    height: 300px;
  }
  .fastReq {
    height: 120px;
  }
}
</style>
