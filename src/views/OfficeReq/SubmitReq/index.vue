<template>
  <el-card>
    <ul v-for="(item, index) in reqtype" :key="index">
      <p>{{ item[0].type }}</p>
      <li
        class="reqName"
        v-for="(type, index) in item"
        :key="index"
        @click="opendialog(item[0].type as string)"
      >
        <span class="svg-icon">
          <img :src="type.icon" />
          <span class="type-name">{{ type.name }}</span>
        </span>
      </li>
    </ul>
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
          <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
          >
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
import { ref, nextTick } from 'vue'
import reqtype from './reqtype'
import { reactive } from 'vue'

// 对话框类型
const dialogType = ref()
const fileList = ref('')

let reqData = reactive({
  id: null,
  applicant: null,
  type: null,
  subTime: null,
  startTime: null,
  endTime: null,
  reason: null,
  status: null,
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

let formRef = ref()

// 打开对话框
const opendialog = (type: string) => {
  dialogType.value = type
  // 重新打开对话框时清空上次操作内容
  nextTick(() => {
    // 恢复表单初始值
    reqData = Object.assign(reqData, {
      id: null,
      applicant: null,
      type: null,
      subTime: null,
      startTime: null,
      endTime: null,
      reason: null,
      status: null,
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
  await formRef.value.validate()
  ElMessage.success({
    message: '提交成功',
    showClose: true,
  })
  cancel()
}

// 退出对话框
const cancel = () => {
  dialogType.value = false
}
</script>

<style lang="scss" scoped>
.reqName {
  display: inline-block;
  border: 1px solid #dcdfe6;
  height: 80px;
  width: 120px;
  margin: 8px 0;
  .svg-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $font-color;
    font-size: 14px;
    height: 100%;
    cursor: pointer;
    img {
      width: 40px;
    }
    .type-name {
      margin-top: 8px;
    }
  }
  :hover {
    background-color: #f2f6fc;
  }
}
</style>
