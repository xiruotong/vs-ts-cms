<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <div class="tabs">
      <el-tabs model-value="account" type="border-card" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>

          <panel-account ref="accountRef"></panel-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>

          <panel-phone></panel-phone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="control-account">
      <el-checkbox v-model="isKeep" label="记住密码" size="large" />
      <el-link href="" type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick()"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import panelPhone from './panel-phone.vue'
import panelAccount from './panel-account.vue'
import { localCache } from '@/utils/cache'

const CACHE_ISKEEP = 'isKeep'

const activeName = ref('account')
const isKeep = ref<boolean>(localCache.getCache(CACHE_ISKEEP) ?? false)
watch(isKeep, (newValue) => {
  localCache.setCache(CACHE_ISKEEP, newValue)
})
const accountRef = ref<InstanceType<typeof panelAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    // 1.获取子组件实例
    accountRef.value?.loginAction(isKeep.value)
    // 2.
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
