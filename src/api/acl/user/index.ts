import request from '@/utils/request'

// 统一管理项目用户相关的接口
enum API {
  USERINFO_URL = '/acl/user/',
  ADDUSER_URL = '/acl/adduser/',
}

// 获取用户信息接口的方法
export const reqUserList = (page: number, limit: number) =>
  request.get<any>(API.USERINFO_URL + `${page}/${limit}`)
//  添加用户信息的方法

export const addUser = () => request.get<any>(API.USERINFO_URL)
