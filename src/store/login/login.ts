import router from '@/router'
import { accountLoginRequest, getUserIfoById, getUserMenusByRoleID } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import type { IAccount } from '@/views/login/types'
import { defineStore } from 'pinia'
import { LOGIN_TOKEN } from '@/global/register-icons'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenuListToPermission, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 如何指定state类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      const name = loginResult.data.name

      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户详细信息（role信息）
      const userInfoResult = await getUserIfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // console.log(this.userInfo.role)

      //3.根据角色请求用户权限（菜单menu)
      const useMenuResult = await getUserMenusByRoleID(this.userInfo.role!.id)
      const userMenus = useMenuResult.data
      this.userMenus = userMenus
      // console.log(this.userMenus)

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求所有数据role和department
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 获取登录用户的所有按钮权限
      const permissions = mapMenuListToPermission(userMenus)
      this.permissions = permissions

      // 6.动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 5.页面跳转（main）
      router.push('/main')
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
      }

      // 请求所有数据role和department
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 获取登录用户的所有按钮权限
      const permissions = mapMenuListToPermission(userMenus)
      this.permissions = permissions

      // 6.动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
  },
})

export default useLoginStore
