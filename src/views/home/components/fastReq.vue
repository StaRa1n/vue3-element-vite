<template>
  <el-card class="fastReq">
    <div class="header">快速申请</div>
    <div class="container">
      <div v-for="item in reqBtn" :key="item.type">
        <el-button @click="opendialog(item.type)">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
        </el-button>
        <p>{{ item.type }}</p>
      </div>
    </div>
    <el-dialog
      :model-value="dialogType"
      :title="dialogType"
      width="500px"
      @close="aftercolse"
    >
      <el-form
        :model="reqData"
        :rules="rules"
        label-position="top"
        ref="formRef"
      >
        <el-form-item label="请假类型" prop="type">
          <el-select v-model="reqData.type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            type="date"
            v-model="reqData.startTime"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            type="date"
            v-model="reqData.endTime"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="请假原因" prop="reason">
          <el-input type="textarea" autosize v-model="reqData.reason" />
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitReq">提交</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import '../style/cardheader.scss'
const reqBtn = [
  {
    type: '请假',
    icon: 'Sunrise',
  },
  {
    type: '审批',
    icon: 'Document',
  },
  {
    type: '加班',
    icon: 'Calendar',
  },
  {
    type: '报销',
    icon: 'Wallet',
  },
  {
    type: '出差',
    icon: 'SuitcaseLine',
  },
  {
    type: '绩效',
    icon: 'Medal',
  },
  {
    type: '工资',
    icon: 'CreditCard',
  },
]
import { ref, reactive, nextTick } from 'vue'
import { applyAddReq } from '@/api/ReqOffice'

// 对话框类型
const dialogType = ref()
let formRef = ref()

// 表单信息
let reqData = reactive({
  id: null,
  applicant: localStorage.getItem('TOKEN') as string,
  name: localStorage.getItem('NAME') as string,
  Approver: '张三',
  type: '',
  subTime: '',
  startTime: '',
  endTime: '',
  reason: '',
  status: '',
})

const rules = {
  type: [
    {
      required: true,
      trigger: 'blur',
      message: '请选择请假类型',
    },
  ],
  startTime: [
    {
      required: true,
      trigger: 'blur',
      message: '请选择时间',
    },
  ],
  endTime: [
    {
      required: true,
      trigger: 'blur',
      message: '请选择时间',
    },
  ],
  reason: [
    {
      required: true,
      trigger: 'blur',
      message: '请填写原因',
    },
  ],
}
// 请假类型
const options = [
  {
    value: '事假',
    label: '事假',
  },
  {
    value: '调休',
    label: '调休',
  },
  {
    value: '年假',
    label: '年假',
  },
  {
    value: '病假',
    label: '病假',
  },
  {
    value: '其他',
    label: '其他',
  },
]
// 打开对话框
const opendialog = (type: string) => {
  dialogType.value = type
  // 重新打开对话框时清空上次操作内容
  nextTick(() => {
    // 恢复表单初始值
    reqData = Object.assign(reqData, {
      id: null,
      applicant: localStorage.getItem('TOKEN') as string,
      name: localStorage.getItem('NAME') as string,
      Approver: '张三',
      type: '',
      subTime: null,
      startTime: null,
      endTime: null,
      reason: '',
      status: '',
    })
    // 清空上一次错误的提示信息
    formRef.value.clearValidate('type')
    formRef.value.clearValidate('startTime')
    formRef.value.clearValidate('endTime')
    formRef.value.clearValidate('reason')
  })
}

// 对话框关闭之前
const aftercolse = () => {
  // 关闭前标题会改变bug
  setTimeout(() => {
    dialogType.value = false
  }, 100)
}

// 提交表单
const submitReq = async () => {
  // 确定表单的校验
  await formRef.value.validate()
  reqData.subTime = new Date().toJSON()
  const result: any = await applyAddReq(reqData)
  console.log(result)

  if (result.code === 201) {
    // eslint-disable-next-line no-undef
    ElMessage.error({
      message: result.data.message,
      showClose: true,
    })
  } else {
    // eslint-disable-next-line no-undef
    ElMessage.success({
      message: result.data.message,
      showClose: true,
    })
  }
  cancel()
}

// 退出对话框
const cancel = () => {
  dialogType.value = false
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 5px;
  div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    p {
      margin-top: 5px;
    }
    .el-button {
      width: 40px;
      height: 40px;
      .el-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
