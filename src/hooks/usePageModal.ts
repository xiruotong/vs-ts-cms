import type PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

type EditFnType = (data: any) => void

export function usePageModal(newCallBack?: EditFnType, editCallBack?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalValue(true)
    if (newCallBack) newCallBack([])
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalValue(false, itemData)
    // console.log({ ...itemData.menuList })
    if (editCallBack) editCallBack(itemData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick,
  }
}
