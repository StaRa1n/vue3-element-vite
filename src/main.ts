import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 引入svg插件
import 'virtual:svg-icons-register'
// 引入自定义插件:注册整个项目的全局组件
import globalComponent from '@/components'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 安装自定义插件
app.use(globalComponent)
// 注册模板路由
app.use(router)
// 挂载应用
app.mount('#app')
