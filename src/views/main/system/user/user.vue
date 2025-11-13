<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
    <user-content
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-btn-click="handleEditClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()

// 对content操作
function handleQueryClick(formData: any) {
  console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
const modalRef = ref<InstanceType<typeof userModal>>()
// 对modal操作
function handleNewClick() {
  modalRef.value?.setModalValue(true)
}
function handleEditClick(itemData: any) {
  console.log(itemData)
  modalRef.value?.setModalValue(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
