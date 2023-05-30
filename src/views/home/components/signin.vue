<template>
  <el-card class="signin">
    <el-row :gutter="0">
      <el-col :span="12">本月迟到次数</el-col>
      <el-col :span="12">今日打卡时间</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="signup">
        <el-button type="primary" size="large" circle>签到</el-button>
      </el-col>
    </el-row>
    <div>地点</div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.signup {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  .el-button {
    font-size: 24px;
    width: 100px;
    height: 100px;
  }
}
</style>
