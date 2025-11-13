<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-menu :is-fold="isCollapse"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
// import { LOGIN_TOKEN } from '@/global/register-icons'
// import router from '@/router'
// import { localCache } from '@/utils/cache'

// function handleExitClick() {
//   // 1.删除token
//   localCache.removeCache(LOGIN_TOKEN)
//   // 2.跳回login页面
//   router.push('/login')
// }

// 处理main-header在折叠变化
const isCollapse = ref(false)
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
}

.main-content {
  height: 100vh;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
