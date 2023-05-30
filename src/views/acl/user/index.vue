<template>
  <el-card class="seach_card">
    <el-form :inline="true" ref="form">
      <el-form-item class="form_item" label="用户名:" :inline="true">
        <el-input placeholder="请输入用户名" v-model="name"></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" @click="searchUser">查询</el-button>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="danger" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <!-- 顶部按钮 -->
    <FromAddUser :getUserList="getUserList" :editUserData="editUserData">
      <template #deleteButton>
        <el-form-item>
          <el-button type="danger" @click="deleteSlectedUsers">
            批量删除
          </el-button>
        </el-form-item>
      </template>
    </FromAddUser>
    <!-- 用户列表 -->

    <el-table
      class="user_table"
      stripe="true"
      border="true"
      :data="userArr"
      @selection-change="selectUser"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="ID" align="center" prop="userId" width="50" />
      <el-table-column label="登录账号" align="center" prop="username" />
      <el-table-column label="用户姓名" align="center" prop="name" />
      <el-table-column label="所在部门" align="center" prop="department" />
      <el-table-column
        label="岗位职称"
        align="center"
        prop="roles"
        show-overflow-tooltip
      />
      <el-table-column label="操作" align="center" width="280">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="User">暂定</el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="deleteUser(row)"
          >
            删除
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
import { ref, onMounted, reactive, toRefs } from 'vue'
import { reqUserList, reqDeleteUser, reqUserInfo } from '@/api/acl/user'
import FromAddUser from './FromAddUser.vue'

// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(5)
// 用户列表
let userArr = ref([])
// 用户中总数据
let total = ref(0)
// 编辑的用户的数据
let editUserData: any = reactive({})
// 复选框选择的用户
let slectedUsers = ref<any[]>([])

// 编辑员工
// 通过toRefs将一个用户的数据给另一个响应式对象
const editUser = (row: any) => {
  const refs = toRefs(row)
  Object.keys(refs).forEach((key) => {
    editUserData[key] = refs[key].value
  })
  // 子组件监听实现出现dialog
  editUserData.editClick = !editUserData.editClick
}

// 用户数据分页展示
const getUserList = async () => {
  const result = await reqUserList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    userArr.value = result.data.userList
    total.value = result.data.total
  } else {
    ElMessage.error(result.data.message)
  }
}
onMounted(async () => {
  getUserList()
})

// 删除单个用户(传入用户id)
const deleteUser = async (row: any) => {
  let result: any = await reqDeleteUser(row.userId)
  if (result.code === 200) {
    console.log(result.data.message)
  }
  getUserList()
}

// 当复选框改变时
const selectUser = (users: any) => {
  slectedUsers.value = users
}
// 删除选择的用户
const deleteSlectedUsers = () => {
  slectedUsers.value.forEach((user) => {
    deleteUser(user)
  })
}

// 查询用户
const name = ref()
const searchUser = async () => {
  const result = await reqUserInfo({ name: name.value })
  if (result.code === 200) {
    userArr.value = result.data.user
    total.value = 1
    console.log(result)
  } else {
    ElMessage.error(ressult.data.message)
  }
}

// 重置搜索框
const reset = () => {
  name.value = ''
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
