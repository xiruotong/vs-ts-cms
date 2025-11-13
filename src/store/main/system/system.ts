import {
  createUserData,
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageById,
  postPageListData,
  postUsersListData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import user from '@/router/main/system/user/user'
import useMainStore from '../main'

const UserSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0,
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      // console.log(userListResult)
      const { totalCount, list } = userListResult.data
      this.userTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      // console.log(deleteResult)

      // 2.请求新数据
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      const newUserData = await createUserData(userInfo)
      // console.log(newUserData)

      // 重新发送请求
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async editUserDataAction(id: number, userInfo: any) {
      //
      const editResult = await editUserData(id, userInfo)
      // console.log(editResult)

      this.postUserListAction({ offset: 0, size: 10 })
    },

    // 针对页面数据 增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)

      // 2.请求新数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      try{
        const newResult = await newPageById(pageName, pageInfo)
        console.log('---')
        console.log(newResult)
        this.postPageListAction(pageName, { offset: 0, size: 10 })

        // 获取完整数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      } catch(error) {
        
      }
    },
    async editPageDataAction(pageName: string, id: number, queryInfo: any) {
      const editResult = editPageData(pageName, id, queryInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
  },
})

export default UserSystemStore
