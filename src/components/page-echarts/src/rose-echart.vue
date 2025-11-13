<template>
  <div class="rose-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'

interface IProps {
  roseData: IEchartValueType[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    legend: {
      top: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [30, 120],
        center: ['50%', '50%'],
        bottom: '15%',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.rose-echart {
}
</style>
