const req = [
  {
    id: 1,
    // 用户token
    applicant: 'Admin Token',
    name: '张三',
    Approver: '李四',
    type: '年假',
    subTime: '2023-06-07 16:15:01',
    startTime: '2023-06-01 00:00:00',
    endTime: '2023-06-05 00:00:00',
    reason: '年假',
    status: '已通过',
  },
  {
    id: 2,
    // 用户token
    applicant: 'Admin Token',
    name: '张三',
    Approver: '李四',
    type: '事假',
    subTime: '2023-06-08 16:15:01',
    startTime: '2023-06-010 00:00:00',
    endTime: '2023-06-012 00:00:00',
    reason: '家中有事',
    status: '待审批',
  },
  {
    id: 3,
    // 用户token
    applicant: 'System Token',
    name: '李四',
    Approver: '张三',
    type: '病假',
    subTime: '2023-06-08 16:15:01',
    startTime: '2023-06-010 00:00:00',
    endTime: '2023-06-012 00:00:00',
    reason: '感冒了',
    status: '已拒绝',
  },
]

export default [
  // 获取申请信息接口(个人)
  {
    url: '/api/ReqOffice/reqlist/:reqStatus',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      const { reqStatus } = request.query
      //查看用户信息是否包含有次token用户
      let reqList = req.filter((item) => item.applicant === token)
      //没有返回失败的信息
      if (!reqList) {
        return { code: 201, data: { message: '获取申请列表失败' } }
      }
      //如果有返回成功信息
      if (reqStatus !== '全部') {
        reqList = reqList.filter((item) => item.status === reqStatus)
      }
      return { code: 200, data: { reqList } }
    },
  },
  // 获取申请信息接口(管理)
  {
    url: '/api/ReqOffice/managereqlist/:name/:reqStatus',
    method: 'get',
    response: (request) => {
      const { name, reqStatus } = request.query
      //查看用户信息是否包含有次token用户
      let reqList = req.filter((item) => item.Approver === name)
      //没有返回失败的信息
      if (!reqList) {
        return { code: 201, data: { message: '获取申请列表失败' } }
      }
      //如果有返回成功信息
      if (reqStatus === '待审核') {
        reqList = reqList.filter((item) => item.status === '待审核')
      } else if (reqStatus === '已审核') {
        reqList = reqList.filter((item) => item.status !== '待审核')
      }
      return { code: 200, data: { reqList } }
    },
  },
  // 添加申请信息接口
  {
    url: '/api/ReqOffice/addreq',
    method: 'post',
    response: (request) => {
      //获取表单信息
      const data = request.body
      //没有则返回失败的信息
      if (!data) {
        return { code: 201, data: { message: '获取申请列表失败' } }
      } else {
        // 加工data
        data.id = req.length + 1
        data.status = '待审批'
        req.push(data)
      }
      //如果有返回成功信息
      return { code: 200, data: { req, message: '提交申请成功' } }
    },
  },

  {
    url: '/api/ReqOffice/editreq',
    method: 'post',
    response: (request) => {
      //获取表单信息
      const data = request.body
      //没有则返回失败的信息
      if (!data) {
        return { code: 201, data: { message: '保存信息失败' } }
      } else {
        // 加工data
        const index = req.findIndex((item) => item.id === data.id)
        req[index] = data
      }
      //如果有返回成功信息
      return { code: 200, data: { req, message: '修改申请成功' } }
    },
  },

  // 删除申请信息接口
  {
    url: '/api/ReqOffice/deletereq',
    method: 'post',
    response: (request) => {
      //获取表单信息
      const ReqId = request.body
      //没有则返回失败的信息
      if (!ReqId) {
        return { code: 201, data: { message: '删除失败,未获取到申请信息' } }
      } else {
        // 加工data
        const index = req.findIndex((item) => item.id === ReqId)
        req.splice(index, 1)
      }
      //如果有返回成功信息
      return { code: 200, data: { message: '删除申请成功' } }
    },
  },
  // 审核申请信息接口
  {
    url: '/api/ReqOffice/changereqstatus',
    method: 'post',
    response: (request) => {
      //获取表单信息
      const { ReqId, status } = request.body
      //没有则返回失败的信息
      if (!ReqId) {
        return { code: 201, data: { message: '审核失败,未获取到申请信息' } }
      } else {
        // 加工data
        req.forEach((item) => {
          if (item.id === ReqId) {
            item.status = status
          }
        })
      }
      //如果有返回成功信息
      return { code: 200, data: { message: '审批成功' } }
    },
  },
]
