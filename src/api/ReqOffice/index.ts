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
export const applyReqList = (reqStatus?: string) =>
  request.get<any, reqInfo>(API.REQLIST_URL + `${reqStatus}`)

// 提交用户申请列表接口方法
export const applyAddReq = (Reqdata: reqInfo) => {
  Reqdata.subTime = moment(Reqdata.subTime).format('YYYY-MM-DD HH:mm:ss')
  Reqdata.startTime = moment(Reqdata.startTime).format('YYYY-MM-DD HH:mm:ss')
  Reqdata.endTime = moment(Reqdata.endTime).format('YYYY-MM-DD HH:mm:ss')
  return request.post<any, reqInfo>(API.ADDREQ_URL, { Reqdata, status })
}
