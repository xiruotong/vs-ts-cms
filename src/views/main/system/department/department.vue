<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-btn-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader"> 我是领导 {{ scope.row.leader }} </span>
      </template>
      <template #parent="scope">
        <span class="parent"> 我是nn: {{ scope.row.parentId }} </span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { computed, ref } from 'vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

// 点击了搜索
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped>
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
