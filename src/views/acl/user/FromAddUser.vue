<template>
  <el-form :inline="true">
    <el-form-item>
      <el-button type="primary" @click="openDialog">添加用户</el-button>
      <el-dialog
        v-model="dialogAddUser"
        :title="dialogAddUser === 'editUser' ? '编辑员工' : '添加员工'"
      >
        <el-form
          :model="form"
          :rules="rules"
          inline="true"
          label-width="auto"
          label-position="top"
          ref="formRef"
        >
          <el-form-item label="员工姓名:" prop="name">
            <el-input
              placeholder="请输入员工姓名"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录账号:" prop="username">
            <el-input
              placeholder="请输入登录账号"
              v-model="form.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码:" prop="phone">
            <el-input
              placeholder="请输入电话号码"
              v-model="form.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="初始密码:" prop="password">
            <el-input
              placeholder="默认密码为登录账号"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工类型:">
            <el-radio-group v-model="form.roles" prop="role">
              <el-radio label="员工" value="员工" />
              <el-radio label="实习生" value="实习生" />
              <el-radio label="临时工" value="临时工" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所在部门:">
            <el-select placeholder="请选择部门" v-model="form.department">
              <el-option value="董事会" />
              <el-option value="人事部" />
              <el-option value="财务部" />
              <el-option value="技术部" />
            </el-select>
          </el-form-item>
          <el-form-item :="111" label="岗位职称:">
            <el-select placeholder="请选择岗位职称" v-model="form.position">
              <el-option value="总经理" />
              <el-option value="产品经理" />
              <el-option value="普通员工" />
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="dialogAddUser = false">
            退出
          </el-button>
        </span>
      </el-dialog>
    </el-form-item>
    <slot name="deleteButton"></slot>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch } from 'vue'
// 引入添加员工的API
import { reqAddUser, reqEditUser } from '@/api/acl/user'

const props = defineProps(['getUserList', 'editUserData'])
// 弹窗显示控制
const dialogAddUser = ref()
let formRef = ref()

// 收集数据
let form = reactive({
  username: '',
  name: '',
  password: '',
  phone: '',
  department: '技术部',
  position: '产品经理',
  desc: '员工',
  roles: ['员工'],
  buttons: ['cuser.detail', 'cuser.user'],
  routes: ['home'],
  token: 'System Token',
})

// 打开对话框
const openDialog = () => {
  dialogAddUser.value = 'addUser'
  // 重新打开对话框时清空上次操作内容
  nextTick(() => {
    // 恢复表单初始值
    form = Object.assign(form, {
      userId: 13,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: '',
      name: '',
      password: '',
      phone: '',
      department: '',
      position: '',
      desc: '员工',
      roles: ['员工'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    })
    // 清空上一次错误的提示信息
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('password')
    formRef.value.clearValidate('phone')
  })
}

// 添加员工
const save = async () => {
  // 保证表单通过校验
  await formRef.value.validate()
  if (dialogAddUser.value === 'addUser') {
    // 请求添加员工
    const result = await reqAddUser(form)
    if (result.code === 200) {
      // 点击后更新数据并关闭对话框
      ElMessage.success(result.data.message)
    } else {
      ElMessage.error(result.data.message)
    }
  } else if (dialogAddUser.value === 'editUser') {
    const result = await reqEditUser(form)
    console.log(result)
  }
  // 更新列表
  props.getUserList()
  dialogAddUser.value = false
}

//编辑员工
watch(props.editUserData, () => {
  dialogAddUser.value = 'editUser'
  form = Object.assign(form, props.editUserData)
})
// 表单校验规则
const usernameRule = (rule: any, value: any, callBack: any) => {
  //
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('登录账号至少为五位'))
  }
}
const rules = {
  name: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入员工姓名',
    },
  ],
  username: [{ required: true, trigger: 'blur', validator: usernameRule }],
  phone: [
    {
      required: true,
      trigger: 'change',
      min: 11,
      max: 11,
      message: '请输入11位电话号码',
    },
  ],
  password: [{ trigger: 'blur', min: 2, message: '密码长度至少为6位' }],
  role: [{ trigger: 'blur', required: true, message: '请选择员工类型' }],
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .el-form-item {
    width: 45%;
    margin-bottom: 20px;
  }
  .dialog-footer {
    display: flex;
    justify-content: end;
  }
}
</style>
