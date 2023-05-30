<template>
  <el-card>
    <el-row :gutter="0">假勤</el-row>
    <el-row :gutter="0">
      <div>请假</div>
      <div>出差</div>
      <div>外出</div>
      <div>加班</div>
    </el-row>
    <el-row :gutter="0">财务</el-row>
    <el-row :gutter="0">
      <div :span="4">报销</div>
      <div :span="4">借款</div>
      <div :span="4">奖励</div>
      <div :span="4">采购</div>
      <div :span="4">活动经费</div>
    </el-row>
    <el-row :gutter="0">行政</el-row>
    <el-row :gutter="0">
      <div :span="4">会议室预定</div>
      <div :span="4">公文流转</div>
      <div :span="4">物品维修</div>
      <div :span="4">用车</div>
      <div :span="4">用章</div>
      <div :span="4">归还</div>
    </el-row>
    <el-row :gutter="0">人事</el-row>
    <el-row :gutter="0">
      <div :span="4">入职</div>
      <div :span="4">转正</div>
      <div :span="4">离职</div>
      <div :span="4">转岗</div>
    </el-row>
    <el-row :gutter="0">其他</el-row>
    <el-row :gutter="0">
      <div :span="4">通用审批</div>
    </el-row>
  </el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  div {
    border: 1px solid bisque;
    height: 80px;
    width: 120px;
  }
}
</style>
