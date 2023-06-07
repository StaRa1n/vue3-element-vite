// 统一管理项目用户相关的接口
import request from '@/utils/request'
import moment from 'moment'

import type { reqInfo } from './type'
// 统一管理项目用户相关的接口
enum API {
  REQLIST_URL = '/ReqOffice/reqlist',
  ADDREQ_URL = '/ReqOffice/addreq',
}

// 暴露请求函数

// 获取用户申请列表接口方法
export const applyReqList = () => request.get<any, reqInfo>(API.REQLIST_URL)

// 提交用户申请列表接口方法
export const applyAddReq = (data: reqInfo) => {
  data.subTime = moment(data.subTime).format('YYYY-MM-DD HH:mm:ss')
  data.startTime = moment(data.startTime).format('YYYY-MM-DD HH:mm:ss')
  data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss')
  return request.post<any, reqInfo>(API.ADDREQ_URL, data)
}
