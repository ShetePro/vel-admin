<template>
  <div>
    <BasicDialog
      :title="titles[status]"
      ref="dialog"
      width="40%"
      :showFooter="status !== 'detail'"
      :loading="dialogLoading"
      @submit="submitDialog"
      @closed="closeDialog"
    >
      <BasicForm ref="formRef" v-model="dialogFormData" :option="formOption">
        <template #icon>
          <IconInput v-model="dialogFormData.icon" />
        </template>
        <template #parentId>
          <InputTree
            v-model="dialogFormData.parentId"
            :default-expand-keys="['-1']"
            node-key="id"
            :tree-props="menuTreeProps"
            :tree-data="getParentTree"
          >
          </InputTree>
        </template>
      </BasicForm>
    </BasicDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BasicForm } from '@/components/Form'
import { BasicDialog } from '@/components/Dialog'
import { BasicDialogMethods } from '@/components/Dialog/src/types'
import { useMessage } from '@/hook/useMessage'
import { BasicFormMethods } from '@/components/Form/src/types'
import { addMenuApi, updateMenuApi } from '@/api/sys/menu'
import InputTree from '@/components/InputTree/InputTree.vue'
import IconInput from '@/components/IconSelect/components/IconInput.vue'

const dialog = ref<BasicDialogMethods>()
const { message } = useMessage()
const emits = defineEmits(['reload'])
let dialogFormData = ref<Recordable>({
  type: 0,
  parentId: '-1'
})
const props = defineProps<{
  menuData: Recordable[]
}>()
const dialogLoading = ref<boolean>(false)
const titles = {
  create: '新增菜单',
  update: '编辑菜单',
  detail: '菜单详情'
}
const menuTreeProps = {
  label: 'menuName'
}

let status = ref<MainDialogStatus>('create')
const formRef = ref<BasicFormMethods>()
const formOption = computed(() => {
  return {
    labelWidth: '80px',
    disabled: status.value === 'detail',
    column: [
      {
        label: '菜单名称',
        prop: 'menuName',
        rules: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
      },
      {
        label: '类型',
        prop: 'type',
        type: 'select',
        dictData: [
          { label: '菜单', value: 0 },
          { label: '按钮', value: 1 }
        ],
        rules: [{ required: true, message: '类型不能为空', trigger: 'blur' }]
      },
      {
        label: '菜单地址',
        prop: 'menuPath',
        display: dialogFormData.value.type === 0,
        rules: [{ required: true, message: '菜单地址不能为空', trigger: 'blur' }]
      },
      {
        label: '权限标识',
        prop: 'permissions',
        display: dialogFormData.value.type !== 0
      },
      {
        label: '图标',
        prop: 'icon',
        slot: true,
        display: dialogFormData.value.type === 0
      },
      {
        label: '是否缓存',
        prop: 'keepAlive',
        type: 'select',
        display: dialogFormData.value.type === 0,
        dictData: [
          { label: '缓存', value: true },
          { label: '不缓存', value: false }
        ],
        rules: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number'
      },
      {
        label: '父节点',
        prop: 'parentId',
        slot: true,
        span: 24
      }
    ]
  }
})
function open(formData: Recordable, mode: MainDialogStatus = 'create') {
  dialog.value?.showDialog()
  dialogFormData.value = { ...formData }
  status.value = mode
}
function submitDialog() {
  formRef.value
    ?.submitForm()
    .then(() => {
      const isCreate = status.value === 'create'
      message(isCreate ? '新增成功' : '修改成功', { type: 'success' })
      dialog.value?.hideDialog()
      emits('reload')
    })
    .catch(() => {
      message('表单填写有误', { type: 'warning' })
    })
}
function closeDialog() {
  formRef.value?.resetForm()
}

const getParentTree = computed(() => {
  return [
    {
      menuName: '根节点',
      id: '-1',
      children: props.menuData || []
    }
  ]
})

defineExpose({
  open
})
</script>

<style scoped></style>
