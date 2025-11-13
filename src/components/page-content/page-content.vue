<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '部门列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建用户'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
        row-key="id"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="Number(pageTotalCount)"
        background
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import UserSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

interface IProps {
  contentConfig: {
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    pageName: string
    childrenTree?: object
  }
}
const props = defineProps<IProps>()

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

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

watch(
  [currentPage, pageSize],
  () => {
    fetchPageListData()
  },
  { immediate: false },
) // 避免初始重复请求

// 定义函数发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const info = { size, offset, ...formData }
  // 2.发送网络请求
  systemStore.postPageListAction(props.contentConfig.pageName, info)
}

// 5.编辑和删除
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

function handleEditBtnClick(itemData: any) {
  // console.log(itemData)0
  emit('EditBtnClick', itemData)
}

// 6.新建用户操作
function handleNewUserClick() {
  emit('newBtnClick')
}

// 监听systemStore中的action是否被执行
systemStore.$onAction(({ name, after }) => {
  // 执行成功来到after
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

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
