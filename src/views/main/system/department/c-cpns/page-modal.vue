<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
              <template v-for="item in entireDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import UserSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})
const isNewRef = ref(true)
const editData = ref()

// 获取role和department数据
const mainStore = useMainStore()
const { entireDepartment } = storeToRefs(mainStore)

// 定义设置dialogVisible方法
function setModalValue(isNew: boolean, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

const systemStore = UserSystemStore()
// 点击确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    console.log(formData)
    systemStore.newPageDataAction('department', formData)
  }
}

defineExpose({ setModalValue })
</script>

<style lang="less" scoped>
.form {
  padding: 0 30px;

  .el-form-item {
    margin-top: 30px;
  }
}
</style>
