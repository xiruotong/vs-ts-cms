import { createApp } from 'vue'
import 'normalize.css'

// 0.0针对ElMessage和ElLoading等组件引用样式
// import 'element-plus/theme-chalk/el-message.css'

// 1.全局注册element plus
// import ElementPlus from 'element-plus'
// 1.1全局样式引入
// import 'element-plus/dist/index.css'

// 2.2使用vite-plugin-style-import

import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// 2.按需引入element plus
// import { ElButton } from 'element-plus'
// const app = createApp(App)
// app.component(ElButton.name, ElButton)

const app = createApp(App)
app.use(registerIcons).use(router).use(pinia).mount('#app')
