<template>
  <div class="search">
    <!-- 1.输入搜索关键字表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item prop="name" label="用户名">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realname" label="真实姓名">
            <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cellphone" label="电话号码">
            <el-input v-model="searchForm.cellphone" placeholder="请输入查询的电话号码"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="enable" label="状态">
            <el-select v-model="searchForm.enable" placeholder="请选择查询状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: '',
})

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
