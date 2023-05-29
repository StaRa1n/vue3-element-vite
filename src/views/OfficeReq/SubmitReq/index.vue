<template>
  <el-card>
    <el-row :gutter="0">假勤</el-row>
    <el-row :gutter="0">
      <el-col :span="4">请假</el-col>
      <el-col :span="4">出差</el-col>
      <el-col :span="4">外出</el-col>
      <el-col :span="4">加班</el-col>
    </el-row>
    <el-row :gutter="0">财务</el-row>
    <el-row :gutter="0">
      <el-col :span="4">报销</el-col>
      <el-col :span="4">借款</el-col>
      <el-col :span="4">奖励</el-col>
      <el-col :span="4">采购</el-col>
      <el-col :span="4">活动经费</el-col>
    </el-row>
    <el-row :gutter="0">行政</el-row>
    <el-row :gutter="0">
      <el-col :span="4">会议室预定</el-col>
      <el-col :span="4">公文流转</el-col>
      <el-col :span="4">物品维修</el-col>
      <el-col :span="4">用车</el-col>
      <el-col :span="4">用章</el-col>
      <el-col :span="4">归还</el-col>
    </el-row>
    <el-row :gutter="0">人事</el-row>
    <el-row :gutter="0">
      <el-col :span="4">入职</el-col>
      <el-col :span="4">转正</el-col>
      <el-col :span="4">离职</el-col>
      <el-col :span="4">转岗</el-col>
    </el-row>
    <el-row :gutter="0">其他</el-row>
    <el-row :gutter="0">
      <el-col :span="4">通用审批</el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  .el-col {
    border: 1px solid bisque;
    height: 80px;
  }
}
</style>
