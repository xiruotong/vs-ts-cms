import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 6.动态添加路由
  // 1.获取菜单(userMenus)
  // 路由对象都在独立的文件中
  // 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1先读取router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true,
  })
  // console.log(files)
  // 1.2添加到数组
  for (const key in files) {
    const module = files[key]
    // console.log(module.default)
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenus: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2.匹配正确路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能 但只用添加一次
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单对应的路由加到routes
        routes.push(route)
      }
      // console.log(route)
      // 记录第一个被匹配到的菜单
      if (!firstMenus && route) firstMenus = submenu
    }
  }
  // console.log(localRoutes)
  return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.加载本地路由
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射id列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 *
 * @param menuList
 * @returns
 */
export function mapMenuListToPermission(menuList: any[]) {
  const permissions: string[] = []
  // console.log(menuList)
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        // console.log(item.permission)
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  // console.log(permissions)
  return permissions
}
