import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export const hyRequest2 = new HYRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('entire请求成功拦截')
      return config
    },
    requestFailureFn: (err) => {
      console.log('entire请求失败拦截')
      return err
    },
    responseSuccessFn: (config) => {
      console.log('entire响应成功拦截')
      return config
    },
    responseFailureFn: (err) => {
      console.log('entire响应失败拦截')
      return err
    }
  }
})

export default hyRequest