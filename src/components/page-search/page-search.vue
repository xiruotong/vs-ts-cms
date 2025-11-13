<template>
  <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字表单 -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="80">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和查询按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}

const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()

function handleResetClick() {
  // 1.form中数据全部重置
  formRef.value?.resetFields()

  // 2.将事件传递出去
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: white;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}
.btns {
  text-align: right;
  padding: 0px 50px 10px 0;

  .el-button {
    height: 36px;
  }
}
</style>
