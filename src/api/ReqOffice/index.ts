// 统一管理项目用户相关的接口
import request from '@/utils/request'
import moment from 'moment'

import type { reqInfo } from './type'
// 统一管理项目用户相关的接口
enum API {
  REQLIST_URL = '/ReqOffice/reqlist',
  ADDREQ_URL = '/ReqOffice/addreq',
  EDITREQ_URL = '/ReqOffice/editreq',
  DELETEREQ_URL = '/ReqOffice/deletereq',
  MANAGEREQLIST_URL = '/ReqOffice/managereqlist',
  CHANGEREQSTATUS_URL = '/ReqOffice/changereqstatus',
}

// 获取用户申请列表接口方法
export const applyReqList = (reqStatus?: string) =>
  request.get<any, reqInfo>(API.REQLIST_URL + `/${reqStatus}`)

// 提交用户申请列表接口方法
export const applyAddReq = (Reqdata: reqInfo) => {
  Reqdata.subTime = moment(Reqdata.subTime).format('YYYY-MM-DD HH:mm:ss')
  Reqdata.startTime = moment(Reqdata.startTime).format('YYYY-MM-DD HH:mm:ss')
  Reqdata.endTime = moment(Reqdata.endTime).format('YYYY-MM-DD HH:mm:ss')
  return request.post<any, reqInfo>(API.ADDREQ_URL, Reqdata)
}

// 编辑用户申请列表接口方法
export const applyEditReq = (Reqdata: reqInfo) => {
  return request.post<any, reqInfo>(API.EDITREQ_URL, Reqdata)
}

// 删除
export const applyDeleteReq = (ReqId: number) =>
  request.post<any, reqInfo>(API.DELETEREQ_URL, ReqId)

// 获取管理审批列表
export const applyManageReqList = (name: string, reqStatus?: string) =>
  request.get<any, reqInfo>(API.MANAGEREQLIST_URL + `/${name}/${reqStatus}`)

// 审核
export const applyChangeReqStatus = (ReqId: number, status: string) =>
  request.post<any, reqInfo>(API.CHANGEREQSTATUS_URL, { ReqId, status })
