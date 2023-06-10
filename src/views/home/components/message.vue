<template>
  <el-card class="message">
    <div class="header">消息公告</div>
    <div
      :gutter="0"
      v-for="(data, index) in messageData"
      :key="index"
      class="title"
    >
      <div :span="6">【{{ data.type }}】</div>
      <div :span="14">{{ data.title }}</div>
      <div :span="4">{{ data.date }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import '../style/cardheader.scss'
const messageData = [
  {
    type: '公司新闻',
    title: '吹响“逆战”集结号丨2021年度集团民主生活会前三次会',
    date: '2023/5/31',
  },
  {
    type: '规章制度',
    title: '关于2023年考勤制度变更通知',
    date: '2023/5/31',
  },
  {
    type: '公告通知',
    title: '关于2021年六月放假通知',
    date: '2023/5/31',
  },
  {
    type: '公司新闻',
    title: '吹响“逆战”集结号丨2021年度集团民主生活会前三次会',
    date: '2023/5/31',
  },
  {
    type: '规章制度',
    title: '关于2023年考勤制度变更通知',
    date: '2023/5/31',
  },
  {
    type: '公告通知',
    title: '关于2021年六月放假通知',
    date: '2023/5/31',
  },
]
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  height: 30px;
  border-bottom: 1px solid #d8d0d0;
  margin-top: 5px;
  color: #5d6167;
  display: flex;
  align-items: center;
  cursor: pointer;
  :first-child {
    color: #f9aa34;
  }
  :nth-child(2) {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
