import { LOGIN_TOKEN } from '@/global/register-icons'
import { localCache } from '@/utils/cache'
import { firstMenus } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('../views/NotFound/NotFound.vue'),
    },
  ],
})

// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue'),
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue'),
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue'),
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue'),
//   },
// ]

// 动态添加路由
// router.addRoute('main', localRoutes[0])

// 导航守卫
// to调整到的位置
// from从哪里跳转过来
// 返回值 决定导航的路径
// 不返回或返回undefined 默认跳转
router.beforeEach((to, from) => {
  // 1.只有登录成功 才能进入main
  const token = localCache.getCache(LOGIN_TOKEN)

  // if (to.path === '/main' && !token) {
  //   return '/login'
  // }
  // if (to.path !== '/login' && !token) {
  //   return '/login'
  // }
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenus?.url
  }
})

export default router
