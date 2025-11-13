<template>
  <div class="line-echart">
    <baseEchart :option="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  labels: string[]
  values: string[]
}>()
const option = computed<EChartsOption>((): EChartsOption => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    title: {},
    legend: {
      formatter: '分类{name}统计',
      textStyle: {
        color: '#333333',
        fontSize: 15,
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 0,
      },
      data: props.labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: props.values,
        type: 'line',
        name: '销量',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(33,147,176,0.5)',
              },
              {
                offset: 1,
                color: 'rgba(33,147,176,0)',
              },
            ],
            global: false,
          },
        },
      },
    ],
  }
})
</script>

<style scoped lang="less"></style>
