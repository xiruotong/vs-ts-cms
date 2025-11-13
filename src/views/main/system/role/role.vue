<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @edit-btn-click="handleEditClick"
      @new-btn-click="handleNewClick"
    ></page-content>
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config.ts'

import pageModal from '@/components/page-modal/page-modal.vue'
import { usePageContent } from '@/hooks/usePageContent.ts'
import { usePageModal } from '@/hooks/usePageModal.ts'
import useMainStore from '@/store/main/main.ts'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus.ts'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallBack, editCallBack)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleElTreeCheck(data: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuLists)
  otherInfo.value = { menuList }
}

function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallBack(itemData: any) {
  console.log(itemData.menuList)
  const menuIds = mapMenuListToIds(itemData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped>
.role {
}
</style>
