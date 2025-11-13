import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'

// 拦截器：蒙版loading/token/配置

/**
 * 两个难点：
 * 1.拦截器进行精细控制
 *  全局拦截器 局部拦截器 单次请求拦截器
 *
 * 2.响应结果类型处理（泛型）
 */

class HYRequest {
  instance: AxiosInstance
  // request实例 -》 axios实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err
      },
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        return err
      },
    )

    // 针对特点hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    )
  }

  // 网络请求封装
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }

    return new Promise<T>((resolve, reject) => {
      // 响应处理
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
