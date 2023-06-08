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
  // 获取申请信息接口
  {
    url: '/api/ReqOffice/reqlist/:reqStatus',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      const reqStatus = request.query
      //查看用户信息是否包含有次token用户
      let reqList = req.filter((item) => item.applicant === token)
      //没有返回失败的信息
      if (!req) {
        return { code: 201, data: { message: '获取申请列表失败' } }
      }
      //如果有返回成功信息
      if (reqStatus !== '') {
        reqList = reqList.filter((item) => item.status === reqStatus)
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
        data.status = '待审核'
        req.push(data)
      }
      //如果有返回成功信息
      return { code: 200, data: { req, message: '提交申请成功' } }
    },
  },
]
