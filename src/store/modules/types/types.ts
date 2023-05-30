import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据state类型
export interface userState {
  token: string | null
  menuRoute: RouteRecordRaw[]
  username: string
  avatar: string
  department: string
  position: string
}
