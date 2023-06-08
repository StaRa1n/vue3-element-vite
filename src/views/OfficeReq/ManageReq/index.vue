<template>
  <el-card class="box-card">
    <el-menu default-active="1" mode="horizontal">
      <el-menu-item index="1" @click="reqStatus = '全部'">全部</el-menu-item>
      <el-menu-item index="2" @click="reqStatus = '待审批'">
        待审批
      </el-menu-item>
      <el-menu-item index="3" @click="reqStatus = '已审批'">
        已审批
      </el-menu-item>
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
        prop="Approver"
        show-overflow-tooltip
      />
      <el-table-column label="审批状态" align="center" prop="status" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editReq(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="deleteReq(row)"
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
      @size-change="getReqList"
      @current-change="getReqList"
    />
    <!-- 对话框 -->
    <el-dialog
      :model-value="dialogStatus"
      :title="dialogReq.type"
      width="500px"
      @closed="aftercolse"
    >
      <el-form>
        <el-form-item label="审核编号">
          {{ dialogReq.id }}
        </el-form-item>
        <el-form-item label="申请状态">
          <el-button type="warning" size="small">
            {{ dialogReq.status }}
          </el-button>
        </el-form-item>
        <el-form-item label="当前审批人">
          {{ dialogReq.Approver }}
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="dialogReq.subTime" autosize disabled></el-input>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-input v-model="dialogReq.startTime" autosize disabled></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="dialogReq.endTime" autosize disabled></el-input>
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input
            type="textarea"
            autosize
            v-model="dialogReq.reason"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveChange">保存</el-button>
        <el-button type="default" @click="dialogStatus = false">取消</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { applyDeleteReq, applyManageReqList } from '@/api/ReqOffice'
import type { reqInfo } from '@/api/ReqOffice/type'
// 首次展示页号
let pageNo = ref(1)
// 单页展示数据条数
let pageSize = ref(5)
// 申请总数
const total = ref()
// 用户申请列表
let reqList = ref()
// 对话框状态
let dialogStatus = ref()
// 对话框展示详情
let dialogReq: reqInfo = reactive({
  id: null,
  applicant: '',
  name: '',
  Approver: '',
  type: '',
  subTime: '',
  startTime: '',
  endTime: '',
  reason: '',
  status: '',
})
// 筛选审批状态
let reqStatus = ref('全部')
// 获取本人申请列表
const getReqList = async () => {
  const name = localStorage.getItem('NAME')
  const result: any = await applyManageReqList(name, reqStatus.value)
  if (result.code === 200) {
    reqList.value = result.data.reqList
    total.value = reqList.value.length
  } else {
    ElMessage.error(result.data.message)
  }
}
// 初始化界面
onMounted(async () => {
  getReqList()
})

watch(reqStatus, () => {
  getReqList()
})

// 对话框关闭之前
const aftercolse = () => {
  // 关闭前标题会改变bug
  setTimeout(() => {
    dialogStatus.value = false
  }, 100)
}
// 编辑
const editReq = (data: any) => {
  dialogStatus.value = true
  dialogReq = Object.assign(dialogReq, data)
}

// 删除
const deleteReq = async (data: any) => {
  const result: any = await applyDeleteReq(data.id)
  if (result.code === 201) {
    ElMessage.error({
      message: result.data.message,
      showClose: true,
    })
  } else {
    ElMessage.success({
      message: result.data.message,
      showClose: true,
    })
  }
  getReqList()
}

// 保存修改
const saveChange = async () => {
  console.log('保存修改')
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
.user_table {
  margin-bottom: 8px;
}
</style>
