<template>
  <div class="login_container">
    <el-row :gutter="0">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_from"
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到江财</h2>
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入用户相关小仓库
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
// 获取路由器
let $router = useRouter()

// 密码与账户
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

// 配置表单规则
const rules = {
  username: [
    {
      required: true,
      min: 5,
      max: 12,
      message: '账号长度为5-12位',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      min: 5,
      max: 12,
      message: '密码长度为5-12位',
      trigger: 'change',
    },
  ],
}
//获取el-form组件
const ruleFormRef = ref()

const login = async () => {
  // 保证表单通过再发请求
  await ruleFormRef.value.validate()

  // 通知仓库发送登录请求
  // 请求成功 => 跳转主页
  // 请求失败 => 弹出失败信息
  try {
    await userStore.userLogin(loginForm)
    // 获取用户信息
    userStore.getUserInfo()
    // 编程式导航跳转到展示数据首页
    $router.push('/')
    // 登录成功的提示信息
    ElNotification({
      title: 'Success',
      message: '登陆成功',
      type: 'success',
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-color: #c45e5e;
  .login_from {
    position: relative;
    width: 80%;
    padding: 40px;
    background-color: #b0b2ea;
    top: 50vh;
    transform: translateY(-50%);
    el-form-item {
      padding-left: 20px;
    }
    h1 {
      color: white;
      font-size: 30px;
    }
    h2 {
      color: white;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
