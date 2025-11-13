<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.初始化实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })

  // 2.第一次执行setOption
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.base-echart {
  .echart {
    height: 300px;
  }
}
</style>
