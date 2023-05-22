// 对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录',
      hiddle: true,
    },
  },
  {
    // 登陆成功后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      title: '主页',
      hiddle: true,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
        },
      },
      {
        path: '/OfficeReq',
        component: () => import('@/views/home/index.vue'),
        name: 'OfficeReq',
        meta: {
          title: '办公审批',
        },
        children: [
          {
            path: '/OfficeReq/SubmitReq',
            component: () => import('@/views/OfficeReq/SubmitReq/index.vue'),
            name: 'SubmitReq',
            meta: {
              title: '发起申请',
            },
          },
          {
            path: '/OfficeReq/SubmitReq',
            component: () => import('@/views/OfficeReq/MyReq/index.vue'),
            name: 'SubmitReq',
            meta: {
              title: '我的申请',
            },
          },
          {
            path: '/OfficeReq/SubmitReq',
            component: () => import('@/views/OfficeReq/ManageReq/index.vue'),
            name: 'SubmitReq',
            meta: {
              title: '管理申请',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hiddle: true,
    },
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    // redirect: '/404',
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
