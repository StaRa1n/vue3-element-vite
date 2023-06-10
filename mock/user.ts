import type { userInfo } from '../src/api/user/type'
import mockJS from 'mockjs'

//用户信息数据
const users = [
  {
    userId: 1,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin',
    name: '张三',
    password: '111111',
    phone: '123456',
    department: '董事会',
    position: '总经理',
    desc: '平台管理员',
    roles: ['平台管理员'],
    buttons: [
      'btn.MyReq.eidt',
      'btn.MyReq.delete',
      'btn.ManageReq.check',
      'btn.ManageReq.pass',
      'btn.ManageReq.reject',
      'btn.ManageReq.approval',
      'btn.user.add',
      'btn.user.deleteSelected',
      'btn.user.edit',
      'btn.user.delete',
      'btn.role.edit',
      'btn.role.delete',
    ],
    routes: [
      'acl',
      'user',
      'role',
      'permission',
      'OfficeReq',
      'SubmitReq',
      'MyReq',
      'ManageReq',
    ],
    token: 'Admin Token',
  },
  {
    userId: 2,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'system',
    name: '李四',
    password: '111111',
    phone: '123456',
    department: '技术部',
    position: '产品经理',
    desc: '系统管理员',
    roles: ['系统管理员'],
    buttons: [
      'btn.MyReq.eidt',
      'btn.MyReq.delete',
      'btn.ManageReq.check',
      'btn.ManageReq.pass',
      'btn.ManageReq.reject',
      'btn.ManageReq.approval',
      'btn.user.add',
      'btn.user.deleteSelected',
      'btn.user.edit',
      'btn.user.delete',
      'btn.role.edit',
      'btn.role.delete',
    ],
    routes: [
      'acl',
      'user',
      'role',
      'permission',
      'OfficeReq',
      'SubmitReq',
      'MyReq',
    ],
    token: 'System Token',
  },
  {
    userId: 10,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '194515',
    name: '王五',
    password: '111111',
    phone: '123456',
    department: '技术部',
    position: '产品经理',
    desc: '员工',
    roles: ['员工'],
    buttons: [
      'btn.MyReq.eidt',
      'btn.ManageReq.check',
      'btn.ManageReq.pass',
      'btn.ManageReq.reject',
      'btn.ManageReq.approval',
      'btn.user.add',
      'btn.user.deleteSelected',
      'btn.user.edit',
      'btn.role.edit',
    ],
    routes: ['acl', 'user', 'role'],
    token: 'User Token',
  },
]
// 随机生成用户数据保存在初始用户数据中
const data = mockJS.mock({
  'dataList|10': [
    {
      'userId|+1': 13,
      phone: /^1[0-9]{10}$/,
      username: function () {
        return this.phone
      },
      name: '@cname',
      avatar: function () {
        return mockJS.Random.image(
          '200x200',
          mockJS.Random.color(),
          '#FFF',
          this.name,
        )
      },
      password: '@string("number", 6)',
      'department|1': ['董事会', '人事部', '财务部', '技术部'],
      'position|1': ['总经理', '产品经理', '普通员工'],
      desc: '@cword(2, 4)',
      'roles|1': ['员工', '实习生', '临时工'],
      buttons: [],
      routes: [
        'acl',
        'user',
        'role',
        'permission',
        'OfficeReq',
        'SubmitReq',
        'MyReq',
        'ManageReq',
      ],
      token: mockJS.Random.guid(),
    },
  ],
})
data.dataList.forEach((element) => {
  users.push(element)
})

// 将用户数据分页数据
// 总数, 页码, 单页限制数据
function getUserList(page: number, limit: number) {
  const userList: userInfo[][] = []
  for (let i = 0; i < Math.ceil(users.length / limit); i++) {
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
  return userList
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
  // 登录获取本地用户信息接口
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
  // 获取用户分页信息接口
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
      return {
        code: 200,
        data: { userList: userList[page - 1], total: users.length, data },
      }
    },
  },
  // 根据用户名查询用户
  {
    url: '/api/acl/serachuser',
    method: 'post',
    response: ({ body }) => {
      const index = users.findIndex((user) => user.name === body.name)

      // 没有返回失败的信息
      if (index === -1) {
        return {
          code: 201,
          data: { message: '未查询到该用户' },
        }
      }
      // 如果有返回成功信息
      return {
        code: 200,
        data: { message: '添加用户成功' + body, user: [users[index]] },
      }
    },
  },
  //添加用户接口
  {
    url: '/api/acl/adduser',
    method: 'post',
    response: ({ body }) => {
      // 没有返回失败的信息
      if (!body) {
        return {
          code: 201,
          data: { message: '上传用户信息失败' },
        }
      }
      users.unshift(body)

      // 如果有返回成功信息
      return {
        code: 200,
        data: { message: '添加用户成功' },
      }
    },
  },
  //修改用户信息接口
  {
    url: '/api/acl/editUser',
    method: 'post',
    response: ({ body }) => {
      // 没有返回失败的信息
      if (!body) {
        return {
          code: 201,
          data: { message: '修改用户信息失败' },
        }
      }
      const index = users.findIndex((user) => user.userId === body.userId)
      users[index] = body
      // 如果有返回成功信息
      return {
        code: 200,
        data: {
          message: '修改用户信息成功',
        },
      }
    },
  },
  //删除用户接口
  {
    url: '/api/acl/deleteuser',
    method: 'post',
    response: ({ body }) => {
      // 没有返回失败的信息
      if (!body) {
        return {
          code: 201,
          data: { message: '获取用户信息失败' },
        }
      }
      const index = users.findIndex((user) => user.userId === body)
      users.splice(index, 1)
      // 如果有返回成功信息
      return {
        code: 200,
        data: {
          message: '删除用户成功',
        },
      }
    },
  },
]
