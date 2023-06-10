<template>
  <div id="min-width">
    <el-card>
      <!-- 用户列表 -->
      <el-table class="user_table" stripe="true" border="true" :data="userArr">
        <el-table-column label="ID" align="center" prop="userId" width="50" />
        <el-table-column label="登录账号" align="center" prop="username" />
        <el-table-column label="用户姓名" align="center" prop="name" />
        <el-table-column
          label="岗位职称"
          align="center"
          prop="roles"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" min-width="100px">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="CheckAcl(row)"
            >
              查看
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="CheckAcl(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteAcl(row)"
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
    <el-dialog :model-value="dialogStatus" @close="closedialog">
      <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
      />
      <el-button type="primary" @click="show">保存</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqUserList, reqDeleteUser } from '@/api/acl/user'
import { reactive } from 'vue'

// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(5)
// 用户列表
let userArr = ref([])
// 用户中总数据
let total = ref(0)
// 对话框状态
let dialogStatus = ref()
const treeRef = ref()
// 对话框权限
let dialogAcl = reactive([])
let dialogBtn = reactive([])

// 权限列表
const data = [
  {
    id: 'OfficeReq',
    type: 'menu',
    label: '办公审批',
    children: [
      {
        id: 'SubmitReq',
        type: 'menu',
        label: '发起申请',
      },
      {
        id: 'MyReq',
        type: 'menu',
        label: '我的申请',
        children: [
          {
            id: 'btn.MyReq.eidt',
            label: '编辑按钮',
          },
          {
            id: 'btn.MyReq.delete',
            label: '删除按钮',
          },
        ],
      },
      {
        id: 'ManageReq',
        type: 'menu',
        label: '管理申请',
        children: [
          {
            id: 'btn.ManageReq.check',
            label: '查看按钮',
          },
          {
            id: 'btn.ManageReq.pass',
            label: '通过按钮',
          },
          {
            id: 'btn.ManageReq.reject',
            label: '拒绝按钮',
          },
          {
            id: 'btn.ManageReq.approval',
            label: '撤回按钮',
          },
        ],
      },
    ],
  },
  {
    id: 'acl',
    label: '权限管理',
    type: 'menu',
    children: [
      {
        id: 'user',
        label: '员工管理',
        type: 'menu',
        children: [
          {
            id: 'btn.user.add',
            label: '添加用户按钮',
          },
          {
            id: 'btn.user.deleteSelected',
            label: '批量删除按钮',
          },
          {
            id: 'btn.user.edit',
            label: '编辑按钮',
          },
          {
            id: 'btn.user.delete',
            label: '删除按钮',
          },
        ],
      },
      {
        id: 'role',
        label: '权限管理',
        type: 'menu',
        children: [
          {
            id: 'btn.role.edit',
            label: '分配权限按钮',
          },
          {
            id: 'btn.role.delete',
            label: '删除按钮',
          },
        ],
      },
      {
        id: 'permission',
        label: '菜单管理',
        type: 'menu',
      },
    ],
  },
]

// 用户数据分页展示
const getUserList = async () => {
  const result: any = await reqUserList(pageNo.value, pageSize.value)
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

// 查看员工权限
const CheckAcl = (row: any) => {
  console.log(dialogAcl, dialogBtn)
  dialogStatus.value = true
  dialogAcl = row.routes
  dialogBtn = row.buttons

  // 菜单权限
  dialogAcl.forEach((item: string) => {
    treeRef.value.setChecked(item, true, false)
  })
  //按钮权限
  // dialogBtn.forEach((item: string) => {
  //   treeRef.value!.setChecked(item, true, false)
  // })
  console.log(dialogAcl)
}

// 编辑员工
const editAcl = (row: any) => {
  dialogStatus.value = true
  console.log(row)
}

// 删除单个用户(传入用户id)
const deleteAcl = async (row: any) => {
  let result: any = await reqDeleteUser(row.userId)
  if (result.code === 200) {
    console.log(result.data.message)
  }
  getUserList()
}

// 对话框关闭之前
const closedialog = () => {
  dialogStatus.value = false
  dialogAcl = []
  dialogBtn = []
  treeRef.value.setCheckedKeys([])
}

// 保存按钮
const show = () => {
  const res = treeRef.value!.getCheckedNodes(false, true)
  console.log(res)
}
</script>

<style scoped lang="scss">
#min-width {
  min-width: 1000px;
}
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
