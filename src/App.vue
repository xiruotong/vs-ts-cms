<template>
  <div class="app">
    <!-- <h1>{{ counter }}</h1>
    <button @click="increment">+10</button> -->
    <el-config-provider :locale="zhCn">
      <RouterView> </RouterView>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { nextTick, ref } from 'vue'

// const counter = ref(0)
// function increment() {
//   counter.value += 10
//   counter.value += 10
//   counter.value += 10
//   counter.value += 10
//   counter.value += 10
//   counter.value += 10

//   const h1El = document.querySelector('h1')
//   console.log(h1El?.textContent)

//   nextTick(() => {
//     const h1El = document.querySelector('h1')
//     console.log(h1El?.textContent)
//   })
// }
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
