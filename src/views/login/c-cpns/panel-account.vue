<template>
  <div class="panel-account">
    <el-form :model="account" label-width="60px" size="large" :rules="accountRules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '../types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? '',
})

const accountRules: FormRules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    // 补充密码的校验规则
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password length at least 6 characters', trigger: 'blur' },
  ],
}

// 3.执行信号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isKeep: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求携带账号和密码
      loginStore.loginAccountAction({ name, password }).then((res) => {
        // 3.判断是否需要记住密码
        if (isKeep) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的格式后再登录.')
    }
  })
}

defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.panel-account {
}
</style>
