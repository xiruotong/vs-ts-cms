export const BASE_URL = 'http://codercba.com:5000'

// 开发环境生成环境BASE_URL不一样
// 1.手动改

// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) //是否是开发环境
// console.log(import.meta.env.PROD) //是否是生产环境
// console.log(import.meta.env.SSR)

// 2.判断import.meta.env.MODE
// let BASE_URL = ''
// if (import.meta.env.MODE === 'production') {
//   BASE_URL = 'http://codercba.prod:5000'
// } else {
//   BASE_URL = 'http://codercba.dev:8000'
// }

// 3.通过创建.env直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
// export { BASE_URL }
