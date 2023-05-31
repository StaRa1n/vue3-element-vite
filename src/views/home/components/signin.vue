<template>
  <el-card class="signin">
    <el-row :gutter="0" class="rules">
      <p>今日打卡时间</p>
      <div>首次卡: 8:00</div>
      <div>末次卡: 18:00</div>
    </el-row>
    <el-row>
      <el-col :span="24" class="signup">
        <el-button
          type="primary"
          size="large"
          color="#41aae6"
          circle
          @click="signup"
          :disabled="idArrive"
        >
          签到
        </el-button>
      </el-col>
    </el-row>
    <div class="address">
      地点: 江西省南昌市江西财经大学麦庐校区
      <el-icon><Location /></el-icon>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// 模拟签到成功
import { ref, onMounted } from 'vue'
const idArrive = ref(false)
onMounted(() => {
  idArrive.value = false
})

const signup = () => {
  idArrive.value = !idArrive.value
  console.log(idArrive.value)
  ElMessage.success({
    message: '签到成功',
    showClose: true,
  })
}
</script>

<style lang="scss" scoped>
.rules {
  display: block;
  p {
    color: $font-color;
    margin-bottom: 5px;
  }
  div {
    color: #41aae6;
    font-size: 12px;
  }
}
.signup {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
  .el-button {
    font-size: 24px;
    width: 100px;
    height: 100px;
    color: #fff;
  }
}
.address {
  color: $font-color;
  text-align: center;
  font-size: small;
}
</style>
