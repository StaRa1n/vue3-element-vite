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
    <el-table class="user_table" stripe="true" border="true" :data="userArr">
      <el-table-column type="selection" align="center" />
      <el-table-column label="ID" align="center" prop="userId" />
      <el-table-column label="用户姓名" align="center" prop="username" />
      <el-table-column label="联系方式" align="center" prop="phone" />
      <el-table-column label="所在部门" align="center" prop="username" />
      <el-table-column
        label="岗位职称"
        align="center"
        prop="roles"
        show-overflow-tooltip
      />
      <el-table-column label="操作" align="center" width="300">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="User">详略</el-button>
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[2, 3, 4, 5]"
      small="true"
      layout="prev, pager, next, jumper, ->,total,sizes"
      :total="100"
      @size-change="getUserList"
      @current-change="handle"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(3)
// 用户列表
let userArr = ref([])
// 用户中总数据
let total = ref(0)

// 用户数据分页
import { reqUserList } from '@/api/acl/user'

const getUserList = async () => {
  const result = await reqUserList(pageNo.value, pageSize.value)
  console.log(result.data.userList)

  if (result.code === 200) {
    userArr.value = result.data.userList
    total.value = result.data.userList.length
  }
}
onMounted(() => {
  getUserList()
})

const handle = () => {
  getUserList()
}
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
.user_table {
  margin-bottom: 10px;
}
</style>
