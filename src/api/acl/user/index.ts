import request from '@/utils/request'
import mockJS from 'mockjs'
// 统一管理项目用户相关的接口
enum API {
  USERINFO_URL = '/acl/user/',
  ADDUSER_URL = '/acl/adduser/',
  EDITUSER_URL = 'acl/editUser',
  DELETESUSER_URL = 'acl/deleteuser',
  SERACHUER_URL = 'acl/serachuser',
}

// 获取用户列表信息接口的方法
export const reqUserList = (page: number, limit: number) =>
  request.get<any>(API.USERINFO_URL + `${page}/${limit}`)

// 根据用户名获取用户信息的方法
export const reqUserInfo = (data: any) =>
  request.post<any>(API.SERACHUER_URL, data)

// 添加用户信息的方法
export const reqAddUser = (data: any) => {
  // 加工data
  data.userId = mockJS.mock('@integer(20, 999)')
  if (!data.password) data.password = data.username
  data.avatar = function () {
    return mockJS.Random.image(
      '200x200',
      mockJS.Random.color(),
      '#FFF',
      data.name,
    )
  }
  request.post<any>(API.ADDUSER_URL, data)
}

// 修改用户信息
export const reqEditUser = (data: any) =>
  request.post<any>(API.EDITUSER_URL, data)

// 删除用户信息的方法
export const reqDeleteUser = (data: number[]) =>
  request.post<any>(API.DELETESUSER_URL, data)
