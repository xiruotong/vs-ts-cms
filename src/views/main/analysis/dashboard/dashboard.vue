<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item"></count-card>
        </el-col>
      </template>
    </el-row>

    <!-- 2.图表展示 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount"></pie-echart>
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-charts :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount"></rose-echart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 底部图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart
            :labels="showGoodsCategorySale.labels"
            :values="showGoodsCategorySale.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis/analysis'
import countCard from './c-cpns/count-card/count-card.vue'
import { storeToRefs } from 'pinia'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import { RoseEchart, LineEchart, PieEchart, BarEchart, MapCharts } from '@/components/page-echarts'
import { computed } from 'vue'

// 1.发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({ name: item.name, value: item.goodsCount }))
})

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)

  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)

  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
}

.el-row {
  margin-bottom: 10px;
}

.echart {
  height: 250px;
}
</style>
