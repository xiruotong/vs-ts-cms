<template>
  <div class="pie-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { IEchartValueType } from '../types'

interface IProps {
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      itemWidth: 20,
      itemHeight: 10,
      orient: 'horizontal',
      itemGap: 5,
      padding: [0, 5],
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        labelLine: {
          show: true,
          length: 10,
          length2: 20,
          smooth: true,
        },
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.pie-echart {
}
</style>
