<template>
  <el-card class="seach_card">
    <el-form :inline="true" ref="form">
      <el-form-item class="form_item" label="用户名:" :inline="true">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="danger">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary">添加用户</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table class="user_table" stripe="true" border="true">
      <el-table-column type="selection" align="center" />
      <el-table-column label="ID" align="center" />
      <el-table-column label="用户昵称" align="center" />
      <el-table-column label="用户姓名" align="center" />
      <el-table-column label="所在部门" align="center" />
      <el-table-column label="岗位职称" align="center" />
      <el-table-column label="操作" align="center" width="220" />
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 10]"
      small="true"
      layout="prev, pager, next, jumper, ->,total,sizes"
      :total="200"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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

<style scoped lang="scss">
.seach_card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .form_item {
    margin-bottom: 0;
  }
}
</style>
