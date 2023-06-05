<template>
  <el-card>
    <el-row :gutter="0">假勤</el-row>
    <el-row :gutter="0">
      <div @click="opendialog">请假</div>
      <div>出差</div>
      <div>外出</div>
      <div>加班</div>
    </el-row>
    <el-row :gutter="0">财务</el-row>
    <el-row :gutter="0">
      <div :span="4">报销</div>
      <div :span="4">借款</div>
      <div :span="4">奖励</div>
      <div :span="4">采购</div>
      <div :span="4">活动经费</div>
    </el-row>
    <el-row :gutter="0">行政</el-row>
    <el-row :gutter="0">
      <div :span="4">会议室预定</div>
      <div :span="4">公文流转</div>
      <div :span="4">物品维修</div>
      <div :span="4">用车</div>
      <div :span="4">用章</div>
      <div :span="4">归还</div>
    </el-row>
    <el-row :gutter="0">人事</el-row>
    <el-row :gutter="0">
      <div :span="4">入职</div>
      <div :span="4">转正</div>
      <div :span="4">离职</div>
      <div :span="4">转岗</div>
    </el-row>
    <el-row :gutter="0">其他</el-row>
    <el-row :gutter="0">
      <div :span="4">通用审批</div>
    </el-row>
  </el-card>
  <el-dialog :model-value="showDialog" :before-close="closeDialog">
    <el-form>
      <el-form-item label="请假类型">
        <el-select style="width: 500px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker type="date" v-model="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker type="date" v-model="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="请假原因">
        <el-input type="textarea" style="width: 200px"></el-input>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
let showDialog = ref()

const date = ref('')
const fileList = ref('')

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
const opendialog = () => {
  console.log(showDialog.value)

  showDialog.value = true
}

// 对话框关闭之前
const closeDialog = (done: any) => {
  showDialog.value = false
  done()
}

const submitReq = () => {
  console.log('提交表单')
}

const cancel = () => {
  showDialog.value = false
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  div {
    border: 1px solid bisque;
    height: 80px;
    width: 120px;
  }
}
</style>
