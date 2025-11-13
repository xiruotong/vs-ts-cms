<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" prop="name" label="部门名称" />
        <el-table-column align="center" prop="leader" label="部门领导" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="200px" />
        <el-table-column align="center" prop="createAt" label="创建时间" width="270px">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间" width="270px">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160px">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newBtnClick', 'EditBtnClick'])

// 1.发起action 请求userlist的数据
const systemStore = UserSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2.获取userlist数据 进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
console.log(pageList)

const handleSizeChange = (val: number) => {
  fetchPageListData()
}
const handleCurrentChange = (val: number) => {
  fetchPageListData()
}

// 定义函数发送网络请求
function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const info = { size, offset, ...formData }
  // 2.发送网络请求
  systemStore.postPageListAction('department', info)
}

// 5.编辑和删除
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}

function handleEditBtnClick(itemData: any) {
  // console.log(itemData)0
  emit('EditBtnClick', itemData)
}

// 6.新建用户操作
function handleNewUserClick() {
  emit('newBtnClick')
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;

  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 8px 8px;
  }
}

.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
