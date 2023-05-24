// layout组件相关配置
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      // 折叠菜单
      fold: false,
      // 刷新业务
      refresh: false
    }
  },
})

export default useLayOutSettingStore
