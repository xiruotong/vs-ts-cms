// 下拉选项类型（和 entireDepartment 的数据结构匹配，比如部门的 id 和 name）
export interface SelectOption {
  label: any // 选项值（对应部门 id）
  value: any // 选项显示文本（对应部门名称）
}

// 弹窗表单项类型（完全匹配你 formItems 里的字段）
export interface ModalFormItem {
  type: 'input' | 'select' // 你的配置里只有 input 和 select 类型
  prop: string // 表单字段名（name/leader/parentId）
  label: string // 表单标签
  placeholder: string // 占位提示
  options?: SelectOption[] // 只有 select 类型有 options，初始为空数组
}

// 弹窗整体配置类型（匹配你的 modalConfig 结构）
export interface ModalConfig {
  pageName: string
  header: {
    newTitle: string // 新建弹窗标题
    editTitle: string // 编辑弹窗标题
  }
  formItems: ModalFormItem[] // 表单项数组
}

const modalConfig: ModalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门',
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询部门名称',
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询部门领导',
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: [], // 此时 TS 会识别为 SelectOption[]，而非 never[]
    },
  ],
}

export default modalConfig
