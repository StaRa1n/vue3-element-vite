<template>
  <el-card class="message">
    <div class="header">我的申请</div>
    <!-- 用户列表 -->
    <el-table class="user_table" stripe="true" border="true" :data="reqList">
      <el-table-column label="ID" align="center" prop="id" width="50" />
      <el-table-column label="申请人" align="center" prop="name" />
      <el-table-column
        label="申请时间"
        align="center"
        prop="subTime"
        width="170"
      />
      <el-table-column label="审批类型" align="center" prop="type" />
      <el-table-column
        label="当前审批人"
        align="center"
        prop="Approver"
        min-width="100px"
      />
      <el-table-column label="审批状态" align="center" prop="status">
        <template #default="{ row }">
          <el-button :type="btnStatus(row.status)" size="small">
            {{ row.status }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="140px">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editReq(row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
          <el-button :type="btnStatus(dialogReq.status)" size="small">
            {{ dialogReq.status }}
          </el-button>
        </el-form-item>
        <el-form-item label="申请人">
          {{ dialogReq.name }}
        </el-form-item>
        <el-form-item label="当前审批人">
          {{ dialogReq.Approver }}
        </el-form-item>
        <el-form-item label="提交时间">
          {{ dialogReq.subTime }}
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            v-model="dialogReq.startTime"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="date"
            v-model="dialogReq.endTime"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input type="textarea" autosize v-model="dialogReq.reason" />
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon><Plus /></el-icon>
          </el-upload>
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
import '../style/cardheader.scss'
import { ref, onMounted, reactive, watch } from 'vue'
import { applyReqList, applyEditReq } from '@/api/ReqOffice'
import type { reqInfo } from '@/api/ReqOffice/type'
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
  const result: any = await applyReqList(reqStatus.value)
  if (result.code === 200) {
    reqList.value = result.data.reqList
    total.value = reqList.value.length
  } else {
    // eslint-disable-next-line no-undef
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

// 保存修改
const saveChange = async () => {
  const result: any = await applyEditReq(dialogReq)
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
  dialogStatus.value = false
  getReqList()
}

// 状态按钮颜色
const btnStatus = (status: string) => {
  switch (status) {
    case '待审批':
      return 'warning'
    case '已通过':
      return 'success'
    case '已拒绝':
      return 'danger'
  }
}
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
