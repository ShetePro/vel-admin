<template>
  <div>
    <BasicDialog
      title="变更密码"
      ref="dialog"
      width="30%"
      :showFooter="status !== 'detail'"
      :loading="dialogLoading"
      @submit="submitDialog"
      @closed="closeDialog"
    >
      <BasicForm
        ref="formRef"
        v-model="dialogFormData"
        :option="formOption"
      ></BasicForm>
    </BasicDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BasicForm } from "@/components/Form";
import { BasicDialog } from "@/components/Dialog";
import { BasicDialogMethods } from "@/components/Dialog/src/types";
import { useMessage } from "@/hook/useMessage";
import { BasicFormMethods } from "@/components/Form/src/types";
import { changeUserPassword } from "@/api/sys/user";
import { AesEncryption } from "@/utils/encryption";
import { useUserStore } from "@/store/modules/user";

const dialog = ref<BasicDialogMethods>();
const { message } = useMessage();
const props = defineProps<{}>();
const userStore = useUserStore()
const emits = defineEmits(['reload'])
let dialogFormData = ref<{
  oldPassword: string;
  newPassword: string;
  newPassword1: string;
}>({
  oldPassword: '',
  newPassword: '',
  newPassword1: ''
});
const dialogLoading = ref<boolean>(false)

let status = ref<MainDialogStatus>("create");
const formRef = ref<BasicFormMethods>();
const formOption = computed(() => {
  return {
    labelWidth: "130px",
    disabled: status.value === "detail",
    column: [
      {
        label: "旧密码",
        prop: "oldPassword",
        span: 24,
        props: {
          type: 'password',
          clearable: true,
          showPassword: true
        },
        rules: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
      },
      {
        label: "新密码",
        prop: "newPassword",
        span: 24,
        props: {
          type: 'password',
          clearable: true,
          showPassword: true
        },
        rules: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
      },
      {
        label: "确认密码",
        prop: "newPassword1",
        span: 24,
        props: {
          type: 'password',
          clearable: true,
          showPassword: true
        },
        rules: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: confirmPassword, trigger: 'blur' }
        ],
      },
    ],
  };
});
function open(formData: Recordable, mode: MainDialogStatus = "create") {
  status.value = mode;
  dialog.value?.showDialog();
}

// 确认密码
function confirmPassword(rule: any, value: any, callback: any) {
  if (dialogFormData.value?.newPassword === value) {
    return callback()
  } else {
    return callback(new Error('两次密码不一致'))
  }
}
function submitDialog() {
  formRef.value
    ?.submitForm()
    .then(() => {
      dialogLoading.value = true
      const aes = new AesEncryption({
        key: "aochendemo@12345",
      });
      changeUserPassword({
        id: userStore.userInfo.id,
        oldPassword: aes.encryptByAES(dialogFormData.value.oldPassword),
        newPassword: aes.encryptByAES(dialogFormData.value.newPassword),
        newPassword1: aes.encryptByAES(dialogFormData.value.newPassword1),
      }).then(() => {
        message( "修改成功,请重新登录！", { type: "success" });
        userStore.logOut()
        dialog.value?.hideDialog();
      }).finally(() => {
        dialogLoading.value = false
      });
    })
    .catch(() => {
      message("表单填写有误", { type: "warning" });
    });
}
function closeDialog() {
  formRef.value?.resetForm();
}

defineExpose({
  open,
  close: closeDialog
});
</script>

<style scoped></style>
