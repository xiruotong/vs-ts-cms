<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-btn-click="handleEditClick"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

// 点击了搜索
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
function handleNewClick() {
  modalRef.value?.setModalValue(true)
}

function handleEditClick(itemData: any) {
  modalRef.value?.setModalValue(false, itemData)
  console.log(itemData)
}
</script>

<style scoped>
.department {
}
</style>
