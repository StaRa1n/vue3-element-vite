<template>
  <el-card class="box-card">
    <el-menu :default-active="1" mode="horizontal">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">待我审批</el-menu-item>
      <el-menu-item index="3">我已审批</el-menu-item>
    </el-menu>
    <!-- 用户列表 -->

    <el-table
      class="user_table"
      stripe="true"
      border="true"
      :data="userArr"
      @selection-change="selectUser"
    >
      <el-table-column label="ID" align="center" prop="userId" width="50" />
      <el-table-column
        label="申请人"
        align="center"
        prop="username"
        width="120"
      />
      <el-table-column label="申请时间" align="center" prop="name" />
      <el-table-column label="审批类型" align="center" prop="department" />
      <el-table-column
        label="当前审批人"
        align="center"
        prop="roles"
        show-overflow-tooltip
      />
      <el-table-column label="审批状态" align="center" prop="department" />
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="User">暂定</el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editUser(row)"
          >
            详略
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      small="true"
      layout="prev, pager, next, jumper, ->,total,sizes"
      :total="total"
      @size-change="getUserList"
      @current-change="getUserList"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(5)
</script>

<style scoped>
.box-card {
  width: 100%;
  height: 100%;
}
</style>
