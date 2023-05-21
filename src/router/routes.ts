// 对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录',
    },
    children: [
      {
        path: '/ceshi1',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试1',
        },
      },
    ],
  },
  {
    // 登陆成功后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '主页',
    },
    children: [
      {
        path: '/ceshi1',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试1',
        },
      },
      {
        path: '/ceshi2',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试2',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
    },
  },
  // {
  //   path: '*',
  //   redirect: '/login',
  // },
]
