// 路由鉴权: 一个路由在什么样的条件下可以访问
import router from './router'
// 引入进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 获取用户小仓库内部token数据,判断用户是否登录成功
import pinia from './store'
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  const token = userStore.token
  const username = userStore.username
  if (token) {
    nprogress.start()
    // 用户已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 有用户信息
      if (username) {
        next()
      } else {
        // 没有用户信息发请求获取用户信息再放行
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          // token过期
          // 用户手动修改了本地token
          // 清空用户信息
          userStore.userLogout()
          next({ path: '/' })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = '在线办公系统-' + to.meta.title
  nprogress.done()
})

// 一:任意路由切换的进度条 nprogress插件
// 二:路由组件访问的权限设置

// 用户未登录: 可以访问login, 访问其余路由直接访问login
// 用户登录后: 不可访问login
