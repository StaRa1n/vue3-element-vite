// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string
  password: string
}

export interface tokenType {
  token?: string
  message?: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: tokenType
}

export interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  phone: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
// 定义服务器返回用户信息相关的数据类型
interface user {
  checkUser: userInfo
}
export interface userInfoReponseData {
  code: number
  data: user
}
