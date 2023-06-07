<template>
  <el-card class="box-card">
    <el-menu default-active="1" mode="horizontal">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">待我审批</el-menu-item>
      <el-menu-item index="3">我已审批</el-menu-item>
    </el-menu>
    <!-- 用户列表 -->

    <el-table class="user_table" stripe="true" border="true" :data="reqList">
      <el-table-column label="ID" align="center" prop="id" width="50" />
      <el-table-column label="申请人" align="center" prop="name" width="120" />
      <el-table-column label="申请时间" align="center" prop="subTime" />
      <el-table-column label="审批类型" align="center" prop="type" />
      <el-table-column
        label="当前审批人"
        align="center"
        prop="name"
        show-overflow-tooltip
      />
      <el-table-column label="审批状态" align="center" prop="status" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="console.log(row)"
          >
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
      :total="100"
      @size-change="console.log(111)"
      @current-change="console.log(111)"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { applyReqList } from '@/api/ReqOffice'
// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(5)
// 用户申请列表
let reqList = ref()
onMounted(async () => {
  let result: any = await applyReqList()
  reqList.value = result.data.reqList
  console.log(result)
})
</script>

<style scoped>
.box-card {
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
</style>
