<template>
  <div class="home">
    <el-row gutter="20" class="home">
      <el-col :span="17">
        <hello />
        <fastReq />
      </el-col>
      <el-col :span="7">
        <signin />
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="6">
        <DateTodo></DateTodo>
      </el-col>
      <el-col :span="11">
        <ReqList />
      </el-col>
      <el-col :span="7">
        <message></message>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import hello from './components/hello.vue'
import fastReq from './components/fastReq.vue'
import signin from './components/signin.vue'
import DateTodo from './components/DateTodo.vue'
import message from './components/message.vue'
import ReqList from './components/ReqList.vue'
</script>

<style lang="scss" scoped>
.home {
  min-width: 1200px;
}

.el-row {
  margin-bottom: 20px;
  .signin {
    height: 260px;
  }
  .message,
  .reqList {
    height: 500px;
  }
  .fastReq {
    height: 120px;
  }
}
</style>
