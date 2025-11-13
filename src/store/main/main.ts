import { getEntireDepartment, getEntireMenu, getEntireRoles } from '@/service/main/main'

import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartment: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartment: [],
    entireMenus: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      const menuResult = await getEntireMenu()
      // console.log(rolesResult, departmentResult)
      console.log(menuResult)

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartment = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    },
  },
})

export default useMainStore
