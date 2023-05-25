<template>
  <el-card class="box-card">
    <el-menu :default-active="1" mode="horizontal">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">待审批</el-menu-item>
      <el-menu-item index="3">审批通过</el-menu-item>
      <el-menu-item index="4">审批拒绝</el-menu-item>
    </el-menu>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.box-card {
  width: 100%;
  height: 100%;
}
</style>
