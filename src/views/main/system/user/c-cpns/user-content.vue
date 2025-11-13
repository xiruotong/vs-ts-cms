<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" prop="name" label="用户名" />
        <el-table-column align="center" prop="realname" label="真实姓名" />
        <el-table-column align="center" prop="cellphone" label="电话号码" width="200px" />
        <el-table-column align="center" prop="enable" label="状态" width="100px">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
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
              v-if="isUpdate"
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="isDelete"
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
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import UserSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newBtnClick', 'EditBtnClick'])

const isCreate = usePermissions('user:create')
const isDelete = usePermissions('user:delete')
const isUpdate = usePermissions('user:update')
const isQuery = usePermissions('user:query')

// 1.发起action 请求userlist的数据
const systemStore = UserSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2.获取userlist数据 进行展示
const { usersList, userTotalCount } = storeToRefs(systemStore)
// console.log(usersList)

const handleSizeChange = (val: number) => {
  fetchUserListData()
}
const handleCurrentChange = (val: number) => {
  fetchUserListData()
}

// 定义函数发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const info = { size, offset, ...formData }
  // 2.发送网络请求
  systemStore.postUserListAction(info)
}

// 5.编辑和删除
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

function handleEditBtnClick(itemData: any) {
  // console.log(itemData)
  emit('EditBtnClick', itemData)
}

// 6.新建用户操作
function handleNewUserClick() {
  emit('newBtnClick')
}

defineExpose({ fetchUserListData })
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
