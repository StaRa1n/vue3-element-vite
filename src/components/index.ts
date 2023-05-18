import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'

// allGlobalComponents这个对象的类型指定
const allGlobalComponents: { [name: string]: Component } = { SvgIcon }

// 对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
