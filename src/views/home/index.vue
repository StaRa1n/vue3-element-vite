<template>
  <el-row gutter="20">
    <el-col :span="17">
      <hello />
      <fastReq />
    </el-col>
    <el-col :span="7">
      <signin />
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
import hello from './components/hello.vue'
import fastReq from './components/fastReq.vue'
import signin from './components/signin.vue'
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;

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
