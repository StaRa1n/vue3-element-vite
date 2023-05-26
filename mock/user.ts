import type { userInfo } from '../src/api/user/type'

//用户信息数据
const users = [
  {
    userId: 1,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin',
    password: '111111',
    phone: '123456',
    desc: '平台管理员',
    roles: ['平台管理员'],
    buttons: ['cuser.detail'],
    routes: ['home'],
    token: 'Admin Token',
  },
  {
    userId: 2,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'system',
    password: '111111',
    phone: '123456',
    desc: '系统管理员',
    roles: ['系统管理员'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  },
  {
    userId: 10,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '张三',
    password: '111111',
    phone: '123456',
    desc: '员工',
    roles: ['员工'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  },
  {
    userId: 11,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '李四',
    password: '111111',
    phone: '123456',
    desc: '员工',
    roles: ['员工'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  },
  {
    userId: 12,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '王五',
    password: '111111',
    phone: '123456',
    desc: '员工',
    roles: ['员工'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  },
]

// 将用户数据分页数据
// 总数, 页码, 单页限制数据
// 未完善总用户数据
function getUserList(page, limit) {
  const userList: userInfo[][] = []
  for (let i = 0; i < 10; i++) {
    const row: userInfo[] = []
    for (let j = 0; j < limit; j++) {
      const index = i * limit + j
      if (index < users.length) {
        row.push(users[index])
      } else {
        break
      }
    }
    userList.push(row)
  }
  users.push({
    userId: Math.random() * 100,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '张三',
    password: '111111',
    phone: '123456',
    desc: '员工',
    roles: ['员工'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token',
  })

  return userList[page - 1]
}

export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = users.find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = users.find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },
  // 分页
  {
    url: '/api/acl/user/:page/:limit',
    method: 'get',
    response: (request) => {
      const { page, limit } = request.query
      //查看用户信息是否包含有次token用户
      const userList = getUserList(page, limit)
      //没有返回失败的信息
      if (!userList) {
        return {
          code: 201,
          data: { message: '获取用户信息失败' },
        }
      }
      //如果有返回成功信息
      return { code: 200, data: { userList, total: 5 } }
    },
  },
]
