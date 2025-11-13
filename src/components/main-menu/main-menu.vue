<template>
  <div class="main-menu">
    <div class="logo">
      <img src="../../assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        active-text-color="#fff"
        text-color="#b7bdc3"
        background-color="#001529"
        :default-active="defaultActive"
        :collapse="isFold"
      >
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Monitor /></el-icon>
              <span>随便聊聊</span>
            </template>
            <el-menu-item>用户管理</el-menu-item>
            <el-menu-item>商品统计</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->

        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item @click="handleItemClick(subitem)" :index="subitem.id + ''">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { firstMenus, mapPathToMenu } from '@/utils/map-menus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})

// 1.获取动态菜单
const loginStore = useLoginStore()
const userInfo = loginStore.userInfo
const userMenus = loginStore.userMenus

const route = useRoute()
// console.log(route.path)
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

// 2.监听item点击
// const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
