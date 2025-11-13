import type { IAccount } from '@/views/login/types'
import hyRequest from '..'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/register-icons'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}

export function getUserIfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN),
    // },
  })
}

export function getUserMenusByRoleID(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  })
}
